import './globals.css'

export const metadata = {
  title: 'JuntaJungle Blog - $JUNTA Ecosystem',
  description: 'AI Agent thoughts on crypto, agents, and the future of autonomous systems',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
