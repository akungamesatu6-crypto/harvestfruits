import { Switch, Route, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import Game from '@/components/Game';

const queryClient = new QueryClient();

function SinglePage() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-background text-foreground selection:bg-accent/30">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div
            className="font-bold text-2xl flex items-center gap-2 text-primary cursor-pointer"
            onClick={() => scrollTo('play')}
          >
            <span className="text-3xl">🍓</span> HarvestFruit
          </div>
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <button
              onClick={() => scrollTo('play')}
              className="hover:text-primary transition-colors"
            >
              Play
            </button>
            <button
              onClick={() => scrollTo('how-to-play')}
              className="hover:text-primary transition-colors"
            >
              How to Play
            </button>
            <button
              onClick={() => scrollTo('privacy')}
              className="hover:text-primary transition-colors"
            >
              Privacy
            </button>
            <a
              href="https://x.com/Harvestfruit20"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Founder
            </a>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Button onClick={() => scrollTo('play')} className="rounded-full px-6">
              Play Now
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Hero / Play Section */}
        <section
          id="play"
          className="py-16 md:py-24 px-4 bg-gradient-to-b from-card to-background relative overflow-hidden"
        >
          <div className="absolute top-10 left-10 text-6xl opacity-20 transform -rotate-12">
            🍎
          </div>
          <div className="absolute top-40 right-10 text-6xl opacity-20 transform rotate-12">
            🍊
          </div>
          <div className="absolute bottom-20 left-20 text-6xl opacity-20 transform rotate-45">
            🍋
          </div>
          <div className="absolute bottom-40 right-20 text-6xl opacity-20 transform -rotate-45">
            🍉
          </div>

          <div className="container mx-auto max-w-5xl flex flex-col items-center text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 drop-shadow-sm leading-tight">
              Catch the harvest!
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
              A cheerful, fast-paced fruit catching game. Drop the rotten ones,
              catch the golden stars, and see how long you can last in the
              sunshine.
            </p>

            <div className="w-full max-w-lg mx-auto">
              <Game />
            </div>
          </div>
        </section>

        {/* How to Play */}
        <section id="how-to-play" className="py-20 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold uppercase tracking-widest bg-primary-foreground/15 px-4 py-1.5 rounded-full mb-4">
                Quick Guide
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">How to Play</h2>
              <div className="h-2 w-24 bg-accent mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-primary-foreground/10 border border-primary-foreground/15 rounded-2xl p-6 flex items-start gap-4">
                <div className="bg-primary-foreground text-primary w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shrink-0 shadow-lg">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Move the Basket</h3>
                  <p className="text-primary-foreground/80 leading-relaxed">
                    Use your <strong>Arrow Keys</strong> or <strong>A/D</strong>{' '}
                    to slide left and right. On mobile, just{' '}
                    <strong>tap and drag</strong> to move your basket.
                  </p>
                </div>
              </div>

              <div className="bg-primary-foreground/10 border border-primary-foreground/15 rounded-2xl p-6 flex items-start gap-4">
                <div className="bg-primary-foreground text-primary w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shrink-0 shadow-lg">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Catch the Good Stuff</h3>
                  <p className="text-primary-foreground/80 leading-relaxed">
                    Every normal fruit is worth <strong>10 points</strong>.
                    Don't let them hit the ground, or you'll lose a life!
                  </p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-2xl">🌟</span> Golden Fruits
                </h3>
                <p className="text-primary-foreground/90 leading-relaxed">
                  Rare and delicious! Catch these for a massive{' '}
                  <strong>50 point bonus</strong>.
                </p>
              </div>

              <div className="bg-black/20 p-6 rounded-2xl border border-black/10 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-2xl">☠️</span> Rotten Fruits
                </h3>
                <p className="text-primary-foreground/90 leading-relaxed">
                  Watch out for the dark ones! Catching a rotten fruit
                  instantly <strong>costs you 1 life</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Policy */}
        <section id="privacy" className="py-24 px-4 bg-card">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold uppercase tracking-widest bg-muted-foreground/10 text-muted-foreground px-4 py-1.5 rounded-full mb-4">
                Trust & Transparency
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Privacy & Legal
              </h2>
              <div className="h-1.5 w-16 bg-muted-foreground/30 mx-auto rounded-full"></div>
            </div>

            <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed">
              Welcome to HarvestFruit! We believe games should be fun, safe,
              and respect your privacy. This policy is simple because our
              data practices are simple:
            </p>

            <div className="grid sm:grid-cols-3 gap-5 mb-14">
              <div className="bg-background border border-border rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">🔒</div>
                <h3 className="font-semibold text-foreground mb-2">No Data Collection</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We collect absolutely nothing. Everything happens locally in
                  your browser.
                </p>
              </div>

              <div className="bg-background border border-border rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">🍪</div>
                <h3 className="font-semibold text-foreground mb-2">No Tracking</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  No cookies, analytics scripts, or ad trackers. Your visit is
                  your business.
                </p>
              </div>

              <div className="bg-background border border-border rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">🧒</div>
                <h3 className="font-semibold text-foreground mb-2">Family Friendly</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Safe for all ages. No personal data means natural COPPA
                  compliance.
                </p>
              </div>
            </div>

            <div className="prose prose-slate lg:prose-lg max-w-none text-muted-foreground prose-headings:text-foreground prose-a:text-primary">
              <h3>Terms of Service</h3>
              <p>
                By playing HarvestFruit, you agree to have fun. The game is
                provided "as is" without any warranties. We are not
                responsible for any sudden cravings for fresh strawberries or
                apples that may occur while playing.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background py-12 px-4 border-t-8 border-accent">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
              <span>🍓</span> HarvestFruit
            </div>
            <p className="text-background/60">A cheerful little browser game.</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 font-medium text-background/80">
            <button onClick={() => scrollTo('play')} className="hover:text-accent transition-colors">
              Play
            </button>
            <button onClick={() => scrollTo('how-to-play')} className="hover:text-accent transition-colors">
              How to Play
            </button>
            <button onClick={() => scrollTo('privacy')} className="hover:text-accent transition-colors">
              Privacy Policy
            </button>
            <a
              href="https://x.com/Harvestfruit20"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors flex items-center gap-1.5"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Founder
            </a>
          </nav>

          <div className="text-background/50 text-sm text-center md:text-right">
            <div>&copy; 2026 HarvestFruit. All rights reserved.</div>
            <div className="mt-1 font-mono text-xs text-background/30 break-all">
              {'<meta name="ory-verify" content="orynth-5e5f171211ef4654b16a135c63a56b26" />'}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={SinglePage} />
      <Route path="*" component={SinglePage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
