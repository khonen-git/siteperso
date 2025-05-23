import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import { NextRequest, NextResponse } from 'next/server';

// Chemin vers le dossier de contenu
const projectsDirectory = path.join(process.cwd(), 'src/content/projects');

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
    
    // Vérifier si le fichier existe
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      );
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
      },
      scope: data,
    });
    
    return NextResponse.json({
      slug,
      frontmatter: data,
      content: mdxSource,
    });
  } catch (error) {
    console.error(`Erreur lors du chargement du projet ${params.slug}:`, error);
    return NextResponse.json(
      { error: 'Erreur lors du chargement du projet' },
      { status: 500 }
    );
  }
} 