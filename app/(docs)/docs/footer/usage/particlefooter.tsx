"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function ParticleAnimationFooter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Particle[] = [];
    const particleCount = 50;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (canvas) {
          if (this.x > canvas.width) this.x = 0;
          else if (this.x < 0) this.x = canvas.width;
          if (this.y > canvas.height) this.y = 0;
          else if (this.y < 0) this.y = canvas.height;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    function init() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      if (!ctx) return;
      if (canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <footer className="relative  py-12 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Stay Connected</h2>
            <form className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  className="bg-white/10 text-white placeholder:text-white/50"
                />
              </div>
              <Button type="submit" variant="secondary" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>
            <nav className="space-y-2 text-white/80">
              <a href="#" className="block hover:text-white">
                Home
              </a>
              <a href="#" className="block hover:text-white">
                About Us
              </a>
              <a href="#" className="block hover:text-white">
                Services
              </a>
              <a href="#" className="block hover:text-white">
                Products
              </a>
              <a href="#" className="block hover:text-white">
                Contact
              </a>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Contact Us
            </h3>
            <address className="space-y-2 not-italic text-white/80">
              <p>123 Innovation Street</p>
              <p>Tech City, TC 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: hello@example.com</p>
            </address>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:text-primary hover:bg-white"
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:text-primary hover:bg-white"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:text-primary hover:bg-white"
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:text-primary hover:bg-white"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/20 pt-8 text-center">
          <p className="text-sm text-white/60">
            © 2024 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
