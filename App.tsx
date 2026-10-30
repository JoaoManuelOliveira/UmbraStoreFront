import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react"

type IconName = "arrow" | "bag" | "bolt" | "box" | "check" | "chevron" | "close" | "code" | "layers" | "menu" | "moon" | "search" | "shield" | "spark" | "sun" | "user"

function Icon({ name, size = 18 }: { name: IconName size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    bag: (
      <>
        <path d="M6 8h12l1 12H5L6 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    bolt: <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" />,
    box: (
      <>
        <path d="m12 2 9 5-9 5-9-5 9-5Z" />
        <path d="m3 7 9 5 9-5M3 12l9 5 9-5M3 17l9 5 9-5" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="m18 6-12 12" />
      </>
    ),
    code: (
      <>
        <path d="m8 9-4 3 4 3" />
        <path d="m16 9 4 3-4 3" />
        <path d="m14 5-4 14" />
      </>
    ),
    layers: (
      <>
        <path d="m12 2 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5" />
        <path d="m3 17 9 5 9-5" />
      </>
    ),
    menu: (
      <>
        <path d="M4 8h16" />
        <path d="M4 16h16" />
      </>
    ),
    moon: <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3-1.5 4.5L6 9l4.5 1.5L12 15l1.5-4.5L18 9l-4.5-1.5L12 3Z" />
        <path d="m5 15-.7 2.3L2 18l2.3.7L5 21l.7-2.3L8 18l-2.3-.7L5 15Z" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 22a8 8 0 0 1 16 0" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  )
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a className="brand" href="#inicio" aria-label="UMBRA Store — início">
      <span className="brand-mark" aria-hidden="true">
        <span />
      </span>
      {!compact && (
        <span className="brand-name">
          UMBRA <b>Store</b>
        </span>
      )}
    </a>
  )
}

function Button({
  children,
  className = "",
  icon,
  onClick,
  type = "button",
}: {
  children: ReactNode
  className?: string
  icon?: IconName
  onClick?: () => void
  type?: "button" | "submit"
}) {
  return (
    <button className={`button ${className}`} onClick={onClick} type={type}>
      <span>{children}</span>
      {icon && <Icon name={icon} size={17} />}
    </button>
  )
}

function SectionLabel({
  children,
  index,
}: {
  children: ReactNode
  index?: string
}) {
  return (
    <div className="section-label">
      {index && <span>{index}</span>}
      {children}
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("umbra_theme") || "dark",
  )
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [authTab, setAuthTab] = useState<"login" | "cadastro">("login")
  const [query, setQuery] = useState("")
  const [newsletter, setNewsletter] = useState("")
  const [newsletterStatus, setNewsletterStatus] = useState("")

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem("umbra_theme", theme)
  }, [theme])

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false)
        setCartOpen(false)
        setAuthOpen(false)
        setMenuOpen(false)
      }
    }
    window.addEventListener("keydown", close)
    return () => window.removeEventListener("keydown", close)
  }, [])

  const searchResults = useMemo(
    () =>
      [
        ["Produtos", "#produtos", "Conheça o catálogo de soluções digitais"],
        ["Categorias", "#categorias", "Encontre a solução certa por objetivo"],
        ["Sobre a UMBRA", "#sobre", "Engenharia, estratégia e design"],
        ["Contato", "#contato", "Converse com a UMBRA Applications"],
      ].filter((item) =>
        item.join(" ").toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  )

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!newsletter) return
    setNewsletterStatus("Enviando…")
    try {
      const response = await fetch(
        `/api/newsletter/inscrever?email=${encodeURIComponent(newsletter)}`,
        { method: "POST" },
      )
      if (!response.ok) throw new Error()
      setNewsletterStatus("Cadastro realizado. Bem-vindo à UMBRA.")
      setNewsletter("")
    } catch {
      setNewsletterStatus("Não foi possível concluir agora. Tente novamente.")
    }
  }

  function goTo(hash: string) {
    setMenuOpen(false)
    setSearchOpen(false)
    window.location.hash = hash
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <Logo />
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#inicio">Início</a>
          <a href="#produtos">Produtos</a>
          <a href="#categorias">Categorias</a>
          <a href="#sobre">Sobre a UMBRA</a>
        </nav>
        <div className="nav-actions">
          <button
            aria-label="Pesquisar"
            className="icon-button"
            onClick={() => setSearchOpen(true)}
            type="button"
          >
            <Icon name="search" />
          </button>
          <button
            aria-label="Abrir carrinho"
            className="icon-button cart-button"
            onClick={() => setCartOpen(true)}
            type="button"
          >
            <Icon name="bag" />
            <span>0</span>
          </button>
          <button
            aria-label={
              theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
            }
            className="icon-button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            type="button"
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} />
          </button>
          <Button className="account-button" onClick={() => setAuthOpen(true)}>
            <Icon name="user" size={16} />
            Acessar
          </Button>
          <button
            aria-expanded={menuOpen}
            aria-label="Abrir menu"
            className="icon-button menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
          <span className="mono-caption">NAVEGAÇÃO / 01—04</span>
          {[
            ["Início", "#inicio"],
            ["Produtos", "#produtos"],
            ["Categorias", "#categorias"],
            ["Sobre a UMBRA", "#sobre"],
          ].map(([label, href], index) => (
            <a href={href} key={href} onClick={() => setMenuOpen(false)}>
              <span>0{index + 1}</span>
              {label}
              <Icon name="arrow" />
            </a>
          ))}
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <SectionLabel>UMBRA APPLICATIONS / DIGITAL PRODUCTS</SectionLabel>
            <h1>
              Software inteligente.
              <br />
              <span>Soluções para o</span>
              <br />
              seu negócio.
            </h1>
            <p>
              Ferramentas digitais desenvolvidas para simplificar processos,
              aumentar a produtividade e impulsionar resultados.
            </p>
            <div className="hero-actions">
              <Button icon="arrow" onClick={() => goTo("#produtos")}>
                Explorar produtos
              </Button>
              <Button className="button-ghost" onClick={() => goTo("#sobre")}>
                Conhecer a UMBRA
              </Button>
            </div>
          </div>

          <div
            className="hero-visual"
            aria-label="Ecossistema de produtos digitais UMBRA"
          >
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="core-object">
              <div className="core-top">
                <span>UMBRA / CORE</span>
                <i />
              </div>
              <div className="core-symbol">
                <span>U</span>
              </div>
              <div className="core-footer">
                <span>Software systems</span>
                <span>v.2025</span>
              </div>
            </div>
            <div className="floating-data data-one">
              <span className="status-dot" />
              SISTEMAS OPERACIONAIS
            </div>
            <div className="floating-data data-two">
              <Icon name="code" size={16} />
              PRODUTOS ESCALÁVEIS
            </div>
            <div className="axis-label axis-x">X / 084</div>
            <div className="axis-label axis-y">Y / 192</div>
          </div>

          <div className="hero-index">
            <span>01</span>
            <i />
            <span>05</span>
          </div>
          <div className="hero-note">
            <span className="status-dot" />
            ECOSSISTEMA ONLINE
          </div>
        </section>

        <section className="trust-strip" aria-label="Diferenciais">
          {[
            [
              "01",
              "Deploy eficiente",
              "Soluções prontas para acelerar sua operação.",
              "bolt",
            ],
            [
              "02",
              "Engenharia aplicada",
              "Produtos construídos com foco em confiabilidade.",
              "code",
            ],
            [
              "03",
              "Suporte especializado",
              "Acompanhamento para uma evolução contínua.",
              "shield",
            ],
          ].map(([number, title, text, icon]) => (
            <article key={number}>
              <div className="trust-number">{number}</div>
              <div className="trust-icon">
                <Icon name={icon as IconName} />
              </div>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="products section-shell" id="produtos">
          <div className="section-heading">
            <div>
              <SectionLabel index="02">PRODUTOS DIGITAIS</SectionLabel>
              <h2>
                Soluções que trabalham
                <br />a favor do seu negócio.
              </h2>
            </div>
            <p>
              Sistemas e ferramentas criados pela UMBRA Applications para
              transformar complexidade em operações mais simples.
            </p>
          </div>

          <div className="catalog-stage">
            <div className="catalog-sidebar">
              <span className="mono-caption">CATÁLOGO / FILTROS</span>
              <button className="filter-active" type="button">
                Todos os produtos <span>00</span>
              </button>
              <div className="filter-line" />
              <p>As categorias cadastradas aparecerão aqui automaticamente.</p>
            </div>
            <div className="catalog-empty">
              <div className="empty-visual">
                <div className="empty-cube">
                  <span>U</span>
                </div>
                <div className="empty-scan" />
              </div>
              <div className="empty-copy">
                <span className="mono-caption">STATUS / CATÁLOGO</span>
                <h3>
                  Novos produtos
                  <br />
                  estão sendo preparados.
                </h3>
                <p>
                  O catálogo exibirá os softwares cadastrados no ambiente
                  conectado, sem substituir informações reais por demonstrações.
                </p>
                <Button
                  className="button-outline"
                  onClick={() => goTo("#contato")}
                >
                  Receber novidades
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="categories section-shell" id="categorias">
          <div className="section-heading compact-heading">
            <div>
              <SectionLabel index="03">DESCOBERTA</SectionLabel>
              <h2>
                Encontre a solução certa
                <br />
                para o próximo passo.
              </h2>
            </div>
          </div>
          <div className="category-grid">
            {[
              [
                "Automação",
                "Fluxos mais simples, menos trabalho repetitivo.",
                "bolt",
                "01",
              ],
              [
                "Gestão",
                "Informação clara para decisões melhores.",
                "layers",
                "02",
              ],
              [
                "Produtividade",
                "Ferramentas objetivas para equipes eficientes.",
                "spark",
                "03",
              ],
              [
                "Operações",
                "Estrutura digital para crescer com segurança.",
                "box",
                "04",
              ],
            ].map(([title, text, icon, number]) => (
              <article key={title}>
                <div className="category-top">
                  <span>{number}</span>
                  <Icon name={icon as IconName} size={22} />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <Icon name="arrow" />
              </article>
            ))}
          </div>
          <p className="category-disclaimer">
            Áreas de descoberta editorial; as categorias comerciais são
            carregadas do cadastro da plataforma.
          </p>
        </section>

        <section className="about section-shell" id="sobre">
          <div className="about-art" aria-hidden="true">
            <div className="about-ring ring-a" />
            <div className="about-ring ring-b" />
            <div className="about-monolith">
              <span>U</span>
            </div>
            <span className="coord coord-a">23° 33' 01.2"</span>
            <span className="coord coord-b">SYSTEM / UMBRA</span>
          </div>
          <div className="about-copy">
            <SectionLabel index="04">UMBRA APPLICATIONS</SectionLabel>
            <h2>
              Por trás de cada produto, existe{" "}
              <span>engenharia, estratégia e design.</span>
            </h2>
            <p>
              Desenvolvemos soluções digitais com foco em funcionalidade,
              qualidade e experiência. Cada produto nasce de um problema real e
              evolui para uma ferramenta clara, confiável e preparada para o
              trabalho.
            </p>
            <div className="about-principles">
              <div>
                <b>01</b>
                <span>Clareza antes da complexidade</span>
              </div>
              <div>
                <b>02</b>
                <span>Tecnologia com propósito</span>
              </div>
              <div>
                <b>03</b>
                <span>Qualidade em cada interação</span>
              </div>
            </div>
          </div>
        </section>

        <section className="final-cta section-shell" id="contato">
          <div className="cta-copy">
            <SectionLabel index="05">PRÓXIMO PASSO</SectionLabel>
            <h2>
              Boas ferramentas mudam
              <br />a forma como você trabalha.
            </h2>
            <p>Conheça os próximos lançamentos da UMBRA Applications.</p>
          </div>
          <form className="newsletter-form" onSubmit={subscribe}>
            <label htmlFor="newsletter">E-mail profissional</label>
            <div>
              <input
                id="newsletter"
                onChange={(event) => setNewsletter(event.target.value)}
                placeholder="nome@empresa.com"
                required
                type="email"
                value={newsletter}
              />
              <Button icon="arrow" type="submit">
                Quero receber
              </Button>
            </div>
            <span className="form-status" aria-live="polite">
              {newsletterStatus}
            </span>
          </form>
        </section>
      </main>

      <footer>
        <div className="footer-main">
          <div>
            <Logo />
            <p>
              Software pensado para negócios
              <br />
              que querem avançar.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <span>PLATAFORMA</span>
              <a href="#produtos">Produtos</a>
              <a href="#categorias">Categorias</a>
              <a href="#inicio">Início</a>
            </div>
            <div>
              <span>EMPRESA</span>
              <a href="#sobre">Sobre a UMBRA</a>
              <a href="#contato">Contato</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} UMBRA Applications</span>
          <span>PRODUTOS DIGITAIS / BRASIL</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            type="button"
          >
            Voltar ao topo <Icon name="arrow" size={15} />
          </button>
        </div>
      </footer>

      {searchOpen && (
        <div
          className="overlay"
          role="presentation"
          onMouseDown={() => setSearchOpen(false)}
        >
          <section
            aria-label="Pesquisa"
            className="search-panel"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="search-input-wrap">
              <Icon name="search" size={22} />
              <input
                autoFocus
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Pesquisar na UMBRA Store..."
                value={query}
              />
              <button
                aria-label="Fechar"
                onClick={() => setSearchOpen(false)}
                type="button"
              >
                <Icon name="close" />
              </button>
            </div>
            <div className="search-results">
              <span className="mono-caption">NAVEGAR</span>
              {searchResults.map(([title, href, text]) => (
                <button key={href} onClick={() => goTo(href)} type="button">
                  <div>
                    <b>{title}</b>
                    <span>{text}</span>
                  </div>
                  <Icon name="chevron" />
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      <div
        className={`drawer-overlay ${cartOpen ? "is-open" : ""}`}
        onClick={() => setCartOpen(false)}
      >
        <aside className="drawer" onClick={(event) => event.stopPropagation()}>
          <div className="drawer-header">
            <div>
              <span className="mono-caption">SUA SELEÇÃO</span>
              <h2>Carrinho</h2>
            </div>
            <button
              aria-label="Fechar carrinho"
              className="icon-button"
              onClick={() => setCartOpen(false)}
              type="button"
            >
              <Icon name="close" />
            </button>
          </div>
          <div className="cart-empty">
            <div>
              <Icon name="bag" size={28} />
            </div>
            <h3>Seu carrinho está vazio.</h3>
            <p>
              Explore o catálogo e adicione os softwares ideais para sua
              operação.
            </p>
            <Button
              onClick={() => {
                setCartOpen(false)
                goTo("#produtos")
              }}
            >
              Explorar produtos
            </Button>
          </div>
          <div className="drawer-footer">
            <span>Subtotal</span>
            <strong>R$ 0,00</strong>
          </div>
        </aside>
      </div>

      {authOpen && (
        <div
          className="overlay"
          role="presentation"
          onMouseDown={() => setAuthOpen(false)}
        >
          <section
            className="auth-panel"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              aria-label="Fechar"
              className="auth-close icon-button"
              onClick={() => setAuthOpen(false)}
              type="button"
            >
              <Icon name="close" />
            </button>
            <div className="auth-brand">
              <Logo compact />
              <span className="mono-caption">IDENTIDADE UMBRA</span>
              <h2>Seu espaço para produtos digitais.</h2>
              <p>Acesse sua conta para gerenciar perfil, compras e licenças.</p>
              <div className="auth-object">
                <span>U</span>
              </div>
            </div>
            <div className="auth-form-side">
              <div className="auth-tabs">
                <button
                  className={authTab === "login" ? "active" : ""}
                  onClick={() => setAuthTab("login")}
                  type="button"
                >
                  Entrar
                </button>
                <button
                  className={authTab === "cadastro" ? "active" : ""}
                  onClick={() => setAuthTab("cadastro")}
                  type="button"
                >
                  Criar conta
                </button>
              </div>
              {authTab === "login" ? (
                <form action="/login" className="auth-form" method="post">
                  <div>
                    <span className="mono-caption">BEM-VINDO DE VOLTA</span>
                    <h3>Acessar plataforma</h3>
                  </div>
                  <label>
                    E-mail
                    <input
                      autoComplete="email"
                      name="email"
                      placeholder="voce@empresa.com"
                      required
                      type="email"
                    />
                  </label>
                  <label>
                    Senha
                    <input
                      autoComplete="current-password"
                      name="senha"
                      placeholder="Sua senha"
                      required
                      type="password"
                    />
                  </label>
                  <Button icon="arrow" type="submit">
                    Acessar conta
                  </Button>
                </form>
              ) : (
                <form action="/cadastro" className="auth-form" method="post">
                  <div>
                    <span className="mono-caption">NOVA CONTA</span>
                    <h3>Comece com a UMBRA</h3>
                  </div>
                  <label>
                    Nome
                    <input
                      name="nome"
                      placeholder="Seu nome completo"
                      required
                      type="text"
                    />
                  </label>
                  <label>
                    E-mail
                    <input
                      autoComplete="email"
                      name="email"
                      placeholder="voce@empresa.com"
                      required
                      type="email"
                    />
                  </label>
                  <label>
                    Senha
                    <input
                      minLength={6}
                      name="senha"
                      placeholder="Mínimo de 6 caracteres"
                      required
                      type="password"
                    />
                  </label>
                  <Button icon="arrow" type="submit">
                    Criar conta
                  </Button>
                </form>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
