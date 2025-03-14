'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Copy, Loader2 } from 'lucide-react';

// Déclaration du type global pour Pyodide
declare global {
  interface Window {
    loadPyodide: (config?: {
      indexURL?: string;
      [key: string]: any;
    }) => Promise<any>;
  }
}

interface CodeBlockProps {
  children: string;
  language: string;
  autoRun?: boolean;
}

export function CodeBlock({ children, language, autoRun = false }: CodeBlockProps) {
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [pyodide, setPyodide] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ajouter le style pour cacher les éléments indésirables s'il n'existe pas déjà
    const styleId = 'codeblock-matplotlib-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        /* Cacher les éléments de la barre d'outils */
        .codeblock-matplotlib div[id^='matplotlib_'] > div:first-child { display: none !important; }
        .codeblock-matplotlib div[id^='matplotlib_'] > div:last-child { display: none !important; }
        .codeblock-matplotlib .matplotlib-toolbar-button { display: none !important; }
        .codeblock-matplotlib #matplotlib_message { display: none !important; }
        /* Nettoyer le conteneur du graphique */
        .codeblock-matplotlib div[id^='matplotlib_'] {
          margin: 0 !important;
          width: 100% !important;
          text-align: left !important;
          position: fixed !important;
          top: -9999px !important;
          left: -9999px !important;
          visibility: hidden !important;
        }
        /* S'assurer que le canvas prend toute la largeur disponible */
        .codeblock-matplotlib canvas {
          max-width: 100%;
          height: auto;
        }
      `;
      document.head.appendChild(style);
    }

    // Créer un conteneur hors-écran pour matplotlib s'il n'existe pas déjà
    const containerId = 'codeblock-matplotlib-container';
    let offscreenContainer = document.getElementById(containerId);
    if (!offscreenContainer) {
      offscreenContainer = document.createElement('div');
      offscreenContainer.id = containerId;
      offscreenContainer.className = 'codeblock-matplotlib';
      offscreenContainer.style.position = 'fixed';
      offscreenContainer.style.top = '-9999px';
      offscreenContainer.style.left = '-9999px';
      offscreenContainer.style.visibility = 'hidden';
      document.body.appendChild(offscreenContainer);
    }

    const loadPyodideScript = () => {
      const scriptId = 'pyodide-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
        script.async = true;
        script.onload = () => {
          if (language === 'python' && autoRun) {
            runCode();
          }
        };
        document.body.appendChild(script);
      }
    };

    loadPyodideScript();

    return () => {
      const container = document.getElementById(containerId);
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, []);

  const initializePyodide = async () => {
    if (!pyodide) {
      setIsLoading(true);
      try {
        const pyodideInstance = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
        });
        await pyodideInstance.loadPackage(['numpy', 'matplotlib', 'scipy']);
        setPyodide(pyodideInstance);
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de Pyodide:', error);
        setOutput('Erreur lors de l\'initialisation de l\'environnement Python');
      }
      setIsLoading(false);
    }
    return pyodide;
  };

  const runCode = async () => {
    if (language !== 'python') {
      return;
    }

    setIsRunning(true);
    setOutput('');

    try {
      const pyodideInstance = await initializePyodide();
      if (!pyodideInstance) return;

      // Configuration de matplotlib
      await pyodideInstance.runPythonAsync(`
        import matplotlib
        matplotlib.use('module://matplotlib_pyodide.html5_canvas_backend')
        import matplotlib.pyplot as plt
        plt.rcParams.update({
            'figure.figsize': [10, 6],
            'figure.dpi': 100,
            'figure.autolayout': True
        })
        plt.clf()
      `);

      // Nettoyage des graphiques précédents
      if (outputRef.current) {
        outputRef.current.innerHTML = '';
      }

      // Exécution du code utilisateur
      const result = await pyodideInstance.runPythonAsync(children);
      if (result !== undefined) {
        setOutput(result.toString());
      }
      
      // Affichage du graphique s'il y en a un
      await pyodideInstance.runPythonAsync(`
        plt.show()
      `);

      // Attendre un court instant pour que le canvas soit complètement rendu
      await new Promise(resolve => setTimeout(resolve, 100));

      // Nettoyer et déplacer le canvas
      const container = document.querySelector('div[id^="matplotlib_"]');
      if (container && outputRef.current) {
        // Copier le canvas dans notre outputRef
        const canvas = container.querySelector('canvas');
        if (canvas) {
          const canvasClone = canvas.cloneNode(true) as HTMLCanvasElement;
          // Copier le contenu du canvas
          const ctx = canvasClone.getContext('2d');
          if (ctx) {
            ctx.drawImage(canvas, 0, 0);
          }
          outputRef.current.appendChild(canvasClone);
        }

        // Déplacer le conteneur original hors écran
        const offscreenContainer = document.getElementById('matplotlib-offscreen-container');
        if (offscreenContainer) {
          offscreenContainer.appendChild(container);
        }
      }

    } catch (error) {
      setOutput(`Erreur: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(children);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code className="text-xs">{children}</code>
        </pre>
        <div className="absolute top-2 right-2 space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={copyCode}
            title="Copier le code"
          >
            <Copy className="h-4 w-4" />
          </Button>
          {language === 'python' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={runCode}
              disabled={isRunning || isLoading}
              title={isLoading ? "Chargement de Python..." : "Exécuter le code"}
            >
              {isRunning || isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>
      <div ref={outputRef} className="mt-4">
        {output && (
          <Card className="p-4">
            <pre className="whitespace-pre-wrap text-xs">{output}</pre>
          </Card>
        )}
      </div>
    </div>
  );
} 