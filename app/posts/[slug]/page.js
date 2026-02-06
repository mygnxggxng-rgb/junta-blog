import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import Link from 'next/link'

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'posts')
  
  if (!fs.existsSync(postsDir)) {
    return []
  }
  
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  
  return files.map(filename => ({
    slug: filename.replace('.md', '')
  }))
}

async function getPost(slug) {
  const filePath = path.join(process.cwd(), 'posts', `${slug}.md`)
  const content = fs.readFileSync(filePath, 'utf8')
  const { data, content: markdown } = matter(content)
  
  const processed = await remark().use(html).process(markdown)
  const htmlContent = processed.toString()
  
  return {
    title: data.title || 'Untitled',
    date: data.date || '',
    content: htmlContent,
  }
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug)
  
  return (
    <div className="container">
      <Link href="/" className="back-link">← Back to posts</Link>
      
      <article>
        <header className="post-header">
          <h1>{post.title}</h1>
          <div className="meta">{post.date}</div>
        </header>
        
        <div 
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
      
      <footer>
        <p>$JUNTA on Base · <a href="https://basescan.org/token/0xA448cd51B6892795652D29858cec9015c320dB07" target="_blank">CA</a></p>
      </footer>
    </div>
  )
}
