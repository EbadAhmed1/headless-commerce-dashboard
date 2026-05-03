import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Package,
  ShoppingCart,
  BarChart3,
  Warehouse,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle2,
  Star,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">CommerceHub</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition">Features</a>
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition">How It Works</a>
            <a href="#testimonials" className="text-sm text-gray-600 hover:text-gray-900 transition">Testimonials</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started Free</Button>
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <a href="#features" className="block text-sm text-gray-600" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#how-it-works" className="block text-sm text-gray-600" onClick={() => setMobileOpen(false)}>How It Works</a>
          <a href="#testimonials" className="block text-sm text-gray-600" onClick={() => setMobileOpen(false)}>Testimonials</a>
          <div className="flex gap-2 pt-2">
            <Link href="/login"><Button variant="ghost" size="sm" className="w-full">Log in</Button></Link>
            <Link href="/signup"><Button size="sm" className="w-full">Get Started</Button></Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          <Zap className="w-4 h-4" />
          All-in-one ecommerce management
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight max-w-4xl mx-auto">
          Manage your store
          <span className="text-blue-600"> smarter</span>, not harder
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Orders, inventory, and analytics — all in one powerful dashboard.
          Connect your Shopify store and take control of your business.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="text-base px-8 py-6 rounded-xl shadow-lg shadow-blue-200">
              Start Free <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <a href="#features">
            <Button variant="outline" size="lg" className="text-base px-8 py-6 rounded-xl">
              See Features
            </Button>
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> Free to start</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> No credit card</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> Shopify integrated</span>
        </div>

        {/* Dashboard preview mockup */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200 border border-gray-200 overflow-hidden">
            <div className="bg-gray-100 px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-4 text-xs text-gray-400">commercehub.app/dashboard</span>
            </div>
            <div className="p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Total Orders', value: '1,234', color: 'text-blue-600' },
                  { label: 'Revenue', value: 'RS 45,231', color: 'text-green-600' },
                  { label: 'Products', value: '456', color: 'text-purple-600' },
                  { label: 'Low Stock', value: '23', color: 'text-orange-600' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                    <p className="text-xs text-gray-500">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="col-span-2 bg-white rounded-xl border border-gray-100 h-32 flex items-center justify-center">
                  <BarChart3 className="w-16 h-16 text-gray-200" />
                </div>
                <div className="bg-white rounded-xl border border-gray-100 h-32 flex items-center justify-center">
                  <ShoppingCart className="w-12 h-12 text-gray-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: 'Order Management',
    description: 'View, track, and manage all orders from Shopify in one unified dashboard. Update statuses and fulfill orders with ease.',
  },
  {
    icon: <Warehouse className="w-6 h-6" />,
    title: 'Inventory Control',
    description: 'Real-time stock levels across all warehouse bins. Get low-stock alerts and transfer inventory between locations.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Analytics & Insights',
    description: 'Revenue trends, top-selling products, and order analytics. Make data-driven decisions for your business.',
  },
  {
    icon: <Package className="w-6 h-6" />,
    title: 'Product Management',
    description: 'Manage products, variants, and attributes. Sync seamlessly with your Shopify store catalog.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Shopify Sync',
    description: 'Automatic webhook-based sync with Shopify. Orders and products stay up-to-date in real time.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Secure & Reliable',
    description: 'JWT authentication, role-based access control, and encrypted data. Your business data stays safe.',
  },
];

function Features() {
  return (
    <section id="features" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Everything you need to run your store
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful tools designed for ecommerce sellers who want to ship more, sell more, and grow faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    step: '1',
    title: 'Connect Your Store',
    description: 'Link your Shopify store in seconds. We automatically import your products, orders, and inventory data.',
  },
  {
    step: '2',
    title: 'Manage Everything',
    description: 'Use one dashboard to handle orders, track inventory, and monitor analytics across your entire business.',
  },
  {
    step: '3',
    title: 'Grow Your Business',
    description: 'Make smarter decisions with real-time insights. Optimize stock, fulfill faster, and scale with confidence.',
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">How It Works</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Up and running in minutes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-blue-200">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Founder, StyleHive',
    quote: 'CommerceHub saved us hours every week. Managing inventory across our warehouse bins used to be a nightmare — now it\'s effortless.',
    rating: 5,
  },
  {
    name: 'Marcus Chen',
    role: 'Operations Manager, TechGear Co.',
    quote: 'The real-time Shopify sync is a game-changer. Orders flow in automatically, and our fulfillment time dropped by 40%.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'CEO, Artisan Goods',
    quote: 'Finally, an admin dashboard that doesn\'t require a PhD to use. Clean, fast, and everything I need in one place.',
    rating: 5,
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Loved by ecommerce sellers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-gray-50 rounded-2xl p-8">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">"{t.quote}"</p>
              <div>
                <p className="font-semibold text-gray-900">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Ready to take control of your store?
        </h2>
        <p className="mt-4 text-lg text-blue-100 max-w-xl mx-auto">
          Join sellers who manage smarter with CommerceHub. Free to start, no credit card required.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-base px-8 py-6 rounded-xl shadow-lg">
              Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 text-base px-8 py-6 rounded-xl">
              Log In
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">CommerceHub</span>
            </div>
            <p className="text-sm leading-relaxed">
              The all-in-one ecommerce admin dashboard for modern sellers.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white transition">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
              <li><a href="#testimonials" className="hover:text-white transition">Testimonials</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/login" className="hover:text-white transition">Log In</Link></li>
              <li><Link href="/signup" className="hover:text-white transition">Sign Up</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          &copy; {new Date().getFullYear()} CommerceHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
