"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Brain,
  TrendingUp,
  Eye,
  Zap,
  BarChart3,
  Target,
  ArrowRight,
  Check,
  Sparkles,
  Layers,
  Globe,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features: Feature[] = [
    {
      icon: <Eye className="h-6 w-6 text-indigo-500" />,
      title: "AI Visibility Tracking",
      description:
        "Monitor how your brand appears across AI-generated search results in real time. Know exactly where you stand.",
    },
    {
      icon: <Brain className="h-6 w-6 text-indigo-500" />,
      title: "Strategic Recommendations",
      description:
        "Get actionable insights powered by AI to improve your positioning in AI search results, not just reports.",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-indigo-500" />,
      title: "Growth Intelligence",
      description:
        "Identify opportunities and trends before your competitors. Turn AI search data into a growth engine.",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-indigo-500" />,
      title: "Competitive Analysis",
      description:
        "Understand how you compare to competitors in AI-generated answers and discover gaps to exploit.",
    },
    {
      icon: <Target className="h-6 w-6 text-indigo-500" />,
      title: "Intent Mapping",
      description:
        "Map user intent patterns across AI platforms to align your content with what AI models recommend.",
    },
    {
      icon: <Layers className="h-6 w-6 text-indigo-500" />,
      title: "Multi-Platform Coverage",
      description:
        "Track visibility across ChatGPT, Perplexity, Google AI Overviews, and more from a single dashboard.",
    },
  ];

  const steps: Step[] = [
    {
      number: "01",
      title: "Connect Your Brand",
      description:
        "Set up your brand profile, keywords, and competitors in minutes. Our system immediately begins scanning AI search platforms.",
      icon: <Globe className="h-8 w-8 text-indigo-500" />,
    },
    {
      number: "02",
      title: "Analyze AI Results",
      description:
        "Luminr continuously monitors how AI models reference and recommend your brand across thousands of queries.",
      icon: <Search className="h-8 w-8 text-indigo-500" />,
    },
    {
      number: "03",
      title: "Get Strategic Insights",
      description:
        "Receive prioritized recommendations to improve your AI search presence, with clear impact projections.",
      icon: <Sparkles className="h-8 w-8 text-indigo-500" />,
    },
    {
      number: "04",
      title: "Grow Your Visibility",
      description:
        "Execute data-driven strategies and track improvements in real-time as your AI search visibility climbs.",
      icon: <TrendingUp className="h-8 w-8 text-indigo-500" />,
    },
  ];

  const pricingTiers: PricingTier[] = [
    {
      name: "Starter",
      price: "$99",
      period: "/month",
      description: "For small businesses beginning their AI search journey.",
      features: [
        "Track up to 50 keywords",
        "3 competitor profiles",
        "Weekly visibility reports",
        "Basic recommendations",
        "Email support",
      ],
      highlighted: false,
    },
    {
      name: "Growth",
      price: "$299",
      period: "/month",
      description: "For growing teams serious about AI search dominance.",
      features: [
        "Track up to 500 keywords",
        "10 competitor profiles",
        "Daily visibility reports",
        "Advanced strategic insights",
        "Multi-platform tracking",
        "Priority support",
        "Custom dashboards",
      ],
      highlighted: true,
      badge: "Most Popular",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations requiring full AI search intelligence.",
      features: [
        "Unlimited keywords",
        "Unlimited competitors",
        "Real-time monitoring",
        "Dedicated strategist",
        "API access",
        "Custom integrations",
        "White-label reports",
        "SLA guarantee",
      ],
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">Luminr</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </a>
              <a href="#faq" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                FAQ
              </a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <a href="/login">
                <Button variant="ghost" className="text-sm">
                  Sign In
                </Button>
              </a>
              <a href="/register">
                <Button className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white">
                  Get Started
                </Button>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-sm text-gray-600 hover:text-gray-900">
                Features
              </a>
              <a href="#how-it-works" className="block text-sm text-gray-600 hover:text-gray-900">
                How It Works
              </a>
              <a href="#pricing" className="block text-sm text-gray-600 hover:text-gray-900">
                Pricing
              </a>
              <a href="#faq" className="block text-sm text-gray-600 hover:text-gray-900">
                FAQ
              </a>
              <Separator />
              <div className="flex flex-col gap-2 pt-2">
                <a href="/login">
                  <Button variant="ghost" className="w-full text-sm">
                    Sign In
                  </Button>
                </a>
                <a href="/register">
                  <Button className="w-full text-sm bg-indigo-600 hover:bg-indigo-700 text-white">
                    Get Started
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            AI Search Intelligence Platform
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 max-w-4xl mx-auto leading-tight">
            Own Your Visibility in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              AI Search
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The strategic operating system that helps businesses understand, track, and grow their presence in AI-generated search results. Go beyond dashboards — take action.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/register">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-base">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="px-8 py-6 text-base">
                See How It Works
              </Button>
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500">No credit card required. Free 14-day trial.</p>

          {/* Hero Visual */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none" />
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-gray-200 shadow-2xl p-8 sm:p-12 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="text-3xl font-bold text-indigo-600">87%</div>
                  <div className="text-sm text-gray-600 mt-1">AI Visibility Score</div>
                  <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-[87%] bg-indigo-500 rounded-full" />
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="text-3xl font-bold text-green-600">+34%</div>
                  <div className="text-sm text-gray-600 mt-1">Monthly Growth</div>
                  <div className="mt-3 flex items-end gap-1 h-8">
                    {[30, 45, 35, 55, 50, 70, 65, 80].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-green-200 rounded-sm"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="text-3xl font-bold text-purple-600">12</div>
                  <div className="text-sm text-gray-600 mt-1">Action Items</div>
                  <div className="mt-3 space-y-1.5">
                    <div className="h-2 bg-purple-100 rounded-full w-full" />
                    <div className="h-2 bg-purple-100 rounded-full w-3/4" />
                    <div className="h-2 bg-purple-100 rounded-full w-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Your Strategic Edge in AI Search
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Luminr goes beyond passive monitoring. Get a complete operating system for understanding and improving your AI search presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border border-gray-200 hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-indigo-50 flex items-center justify-center mb-3">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              From Setup to Strategy in Minutes
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Getting started with Luminr is simple. Our platform does the heavy lifting so you can focus on growing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-indigo-200 to-transparent z-0" />
                )}
                <div className="relative z-10 text-center">
                  <div className="h-16 w-16 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="text-xs font-bold text-indigo-600 mb-2">STEP {step.number}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Pricing</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Plans That Scale With You
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Start free, upgrade when you need more power. Every plan includes core AI search intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={`relative ${
                  tier.highlighted
                    ? "border-indigo-500 shadow-xl scale-105"
                    : "border-gray-200"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-indigo-600 text-white px-3 py-1">{tier.badge}</Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                    <span className="text-gray-600">{tier.period}</span>
                  </div>
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-indigo-600 mt-0.5 shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <a href="/register" className="w-full">
                    <Button
                      className={`w-full ${
                        tier.highlighted
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : ""
                      }`}
                      variant={tier.highlighted ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">FAQ</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is AI search visibility?</AccordionTrigger>
              <AccordionContent>
                AI search visibility refers to how often and prominently your brand, products, or content are mentioned or recommended in AI-generated search results from platforms like ChatGPT, Perplexity, Google AI Overviews, and other AI assistants. As more users turn to AI for answers, being visible in these results becomes critical for business growth.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How is Luminr different from traditional SEO tools?</AccordionTrigger>
              <AccordionContent>
                Traditional SEO tools focus on search engine rankings and keyword positions. Luminr is purpose-built for AI search — it tracks how AI models reference your brand, provides strategic recommendations to improve AI visibility, and acts as an operating system for AI search growth rather than just a reporting dashboard.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Which AI platforms does Luminr track?</AccordionTrigger>
              <AccordionContent>
                Luminr currently tracks visibility across major AI search platforms including ChatGPT, Google AI Overviews, Perplexity, Microsoft Copilot, and Claude. We continuously add new platforms as the AI search landscape evolves.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How quickly can I see results?</AccordionTrigger>
              <AccordionContent>
                You can start seeing visibility data within minutes of setup. Strategic improvements typically show measurable results within 2-4 weeks, depending on your industry and the recommendations you implement. Our platform provides real-time tracking so you can monitor progress continuously.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Is there a free trial?</AccordionTrigger>
              <AccordionContent>
                Yes! Every plan comes with a 14-day free trial with full access to all features. No credit card is required to start. You can explore the platform, see your AI visibility data, and receive strategic recommendations before committing to a paid plan.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-12 sm:p-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Dominate AI Search?
            </h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join forward-thinking businesses already using Luminr to grow their visibility in AI-generated search results. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/register">
                <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-6 text-base font-semibold">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="/login">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base">
                  Sign In
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-indigo-600" />
              <span className="text-lg font-bold text-gray-900">Luminr</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
              <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-gray-900 transition-colors">FAQ</a>
              <a href="/login" className="hover:text-gray-900 transition-colors">Sign In</a>
            </div>
            <p className="text-sm text-gray-500">
              {"© 2024 Luminr. All rights reserved."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}