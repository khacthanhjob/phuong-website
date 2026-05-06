// Root redirect: /phuong-website/ → /phuong-website/en/
export default function RootPage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="refresh" content="0;url=/phuong-website/en/" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.replace('/phuong-website/en/');`,
          }}
        />
      </head>
      <body />
    </html>
  );
}
