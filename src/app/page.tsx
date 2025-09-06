import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Medal, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Plan Your Degree, Simplified with{' '}
                <span className="text-primary">GradX</span>
              </h1>
              <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
                A dynamic, student-centered degree-planning web app for University of Waterloo students. Map out your path to graduation with confidence.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/roadmap">Start Planning</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/courses">Explore Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                Key Features
              </div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                Everything You Need to Succeed
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                GradX offers a suite of powerful tools designed to make academic planning intuitive, interactive, and even fun.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
            <div className="grid gap-1 text-center">
              <Rocket className="w-10 h-10 mx-auto text-primary" />
              <h3 className="text-lg font-bold">Personalized Roadmaps</h3>
              <p className="text-sm text-muted-foreground">
                Generate a personalized course sequence with our AI-powered tool based on your program and goals.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <CheckCircle className="w-10 h-10 mx-auto text-primary" />
              <h3 className="text-lg font-bold">Real-time Validation</h3>
              <p className="text-sm text-muted-foreground">
                Instantly see if your plan meets all prerequisites and degree requirements, avoiding costly mistakes.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <Medal className="w-10 h-10 mx-auto text-primary" />
              <h3 className="text-lg font-bold">Interactive Degree Map</h3>
              <p className="text-sm text-muted-foreground">
                Visualize your academic journey with a drag-and-drop interface. See your progress and plan for the future.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">
              What Our Planners Are Saying
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't just take our word for it. Here's what students think about GradX.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">"COMPLETE GAME CHANGER OMG"</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">"GradX has completely transformed my uni life and reduced my anxiety of planning my degree."</p>
                <p className="font-bold text-sm mt-4">-Mohammad, 1A Computational Mathematics</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">"Finally, Clarity!"</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">"I could finally visualize my entire degree and see exactly what I needed to do. No more confusing spreadsheets."</p>
                <p className="font-bold text-sm mt-4">- Nafia, 1B Civil Engineering</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">"Saved Me From a Mistake"</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">"The prerequisite checker flagged a course I was about to take. It literally saved my term."</p>
                <p className="font-bold text-sm mt-4">- Naomi, 2A Mechatronics</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2025 GradX. All rights reserved.</p>
        <div className="sm:ml-auto text-xs text-muted-foreground">
            Designed and Built by Zareef Yeasin Zaman
        </div>
      </footer>
    </div>
  );
}
