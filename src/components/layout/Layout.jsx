
// TODO sækja Sass

export function Layout({ title, children }) {
  // TODO setja upp layout fyrir vef
  return(
    <div>
      <header>
        <h1>
          {title}
        </h1>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>Fréttir frá <a href="https://www.ruv.is/">RÚV</a></p>
      </footer>
    </div>
  )
}
