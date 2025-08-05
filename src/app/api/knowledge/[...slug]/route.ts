import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/mdx/MDXComponents';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  try {
    const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;
    const filePath = path.join(process.cwd(), 'src/content/knowledge', `${slug}.mdx`);

    // Vérifier si le fichier existe
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Contenu non trouvé' },
        { status: 404 }
      );
    }

    // Lire le contenu du fichier
    const source = fs.readFileSync(filePath, 'utf8');

    // Compiler le MDX
    const { content, frontmatter } = await compileMDX({
      source,
      components: MDXComponents,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
          format: 'mdx'
        },
      },
    });

    return NextResponse.json({ content, frontmatter });
  } catch (error) {
    console.error('Erreur lors du chargement du contenu:', error);
    return NextResponse.json(
      { error: 'Erreur lors du chargement du contenu' },
      { status: 500 }
    );
  }
}