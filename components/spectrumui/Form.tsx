"use client";
import React from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Switch } from "@/components/ui/Switch";
import { Checkbox } from "@/components/ui/CheckBox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Slider } from "@/components/ui/Slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "../ui/Card";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { useMemo, useState } from "react";
import EmojiPicker from "emoji-picker-react";
export default function Inputcollection() {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState("");

  const onEmojiClick = (emojiObject: {
    emoji: React.SetStateAction<string>;
  }) => {
    setChosenEmoji(emojiObject.emoji);
    setIsPickerOpen(false); // close picker after selecting
  };
  const toggleVisibility = () => setIsVisible(!isVisible);

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(password);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };
  return (
    <div className="w-full max-w-4xl mx-auto p-6  rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">
        Pre-designed Components
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Simple Text Input */}
        <div className="space-y-2">
          <Label htmlFor="simple">Simple Text Input</Label>
          <Input id="simple" placeholder="Enter text" />
        </div>

        {/* 2. Required Input */}
        <div className="space-y-2">
          <Label htmlFor="required">
            Required Input <span className="text-red-500">*</span>
          </Label>
          <Input id="required" required placeholder="Required field" />
        </div>

        {/* 3. Disabled Input */}
        <div className="space-y-2">
          <Label htmlFor="disabled">Disabled Input</Label>
          <Input id="disabled" disabled placeholder="Disabled input" />
        </div>

        {/* 4. Input with Helper Text */}
        <div className="space-y-2">
          <Label htmlFor="helper">Input with Helper Text</Label>
          <Input id="helper" placeholder="Enter email" />
          <p className="text-sm text-gray-500">We'll never share your email.</p>
        </div>

        {/* 5. Input with Error */}
        <div className="space-y-2">
          <Label htmlFor="error">Input with Error</Label>
          <Input
            id="error"
            className="border-red-500"
            placeholder="Invalid input"
          />
          <p className="text-sm text-red-500">This field is required.</p>
        </div>

        {/* 6. Input with Success */}
        <div className="space-y-2">
          <Label htmlFor="success">Input with Success</Label>
          <Input
            id="success"
            className="border-green-500"
            placeholder="Valid input"
          />
          <p className="text-sm text-green-500">Looks good!</p>
        </div>

        {/* 8. Number Input */}
        <div className="space-y-2">
          <Label htmlFor="number">Number Input</Label>
          <Input id="number" type="number" placeholder="Enter number" />
        </div>

        {/* 9. Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Input</Label>
          <Input id="email" type="email" placeholder="Enter email" />
        </div>

        {/* 10. URL Input */}
        <div className="space-y-2">
          <Label htmlFor="url">URL Input</Label>
          <Input id="url" type="url" placeholder="Enter URL" />
        </div>

        {/* 11. Tel Input */}
        <div className="space-y-2">
          <Label htmlFor="tel">Telephone Input</Label>
          <Input id="tel" type="tel" placeholder="Enter phone number" />
        </div>

        {/* 12. Search Input */}
        <div className="space-y-2">
          <Label htmlFor="search">Search Input</Label>
          <Input id="search" type="search" placeholder="Search..." />
        </div>

        {/* 13. Date Input */}
        <div className="space-y-2">
          <Label htmlFor="date">Date Input</Label>
          <Input id="date" type="date" />
        </div>

        {/* 14. Time Input */}
        <div className="space-y-2">
          <Label htmlFor="time">Time Input</Label>
          <Input id="time" type="time" />
        </div>

        {/* 15. DateTime-Local Input */}
        <div className="space-y-2">
          <Label htmlFor="datetime">DateTime-Local Input</Label>
          <Input id="datetime" type="datetime-local" />
        </div>

        {/* 16. Month Input */}
        <div className="space-y-2">
          <Label htmlFor="month">Month Input</Label>
          <Input id="month" type="month" />
        </div>

        {/* 17. Week Input */}
        <div className="space-y-2">
          <Label htmlFor="week">Week Input</Label>
          <Input id="week" type="week" />
        </div>

        {/* 18. Color Input */}
        <div className="space-y-2">
          <Label htmlFor="color">Color Input</Label>
          <Input id="color" type="color" className="h-10" />
        </div>

        {/* 19. File Input */}
        <div className="space-y-2">
          <Label htmlFor="file">File Input</Label>
          <Input id="file" type="file" />
        </div>

        {/* 20. Range Input */}
        <div className="space-y-2">
          <Label htmlFor="range">Range Input</Label>
          <Input id="range" type="range" />
        </div>

        {/* 21. Textarea */}
        <div className="space-y-2">
          <Label htmlFor="textarea">Textarea</Label>
          <Textarea id="textarea" placeholder="Enter long text" />
        </div>

        {/* 22. Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox id="checkbox" />
          <Label htmlFor="checkbox">Checkbox</Label>
        </div>

        <div>
          {/* Password input field with toggle visibility button */}
          <div className="space-y-2">
            <Label htmlFor="input-51">
              Input with password strength indicator
            </Label>
            <div className="relative">
              <Input
                id="input-51"
                className="pr-9"
                placeholder="Password"
                type={isVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={strengthScore < 4}
                aria-describedby="password-strength"
              />
              <button
                className="absolute inset-y-px right-px flex h-full w-9 items-center justify-center rounded-r-lg text-muted-foreground/80 transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                onClick={toggleVisibility}
                aria-label={isVisible ? "Hide password" : "Show password"}
                aria-pressed={isVisible}
                aria-controls="password"
              >
                {isVisible ? (
                  <EyeOff
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                    role="presentation"
                  />
                ) : (
                  <Eye
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                    role="presentation"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Password strength indicator */}
          <div
            className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
            role="progressbar"
            aria-valuenow={strengthScore}
            aria-valuemin={0}
            aria-valuemax={4}
            aria-label="Password strength"
          >
            <div
              className={`h-full ${getStrengthColor(
                strengthScore
              )} transition-all duration-500 ease-out`}
              style={{ width: `${(strengthScore / 4) * 100}%` }}
            ></div>
          </div>

          {/* Password strength description */}
          <p
            id="password-strength"
            className="mb-2 text-sm font-medium text-foreground"
          >
            {getStrengthText(strengthScore)}. Must contain:
          </p>

          {/* Password requirements list */}
          <ul className="space-y-1.5" aria-label="Password requirements">
            {strength.map((req, index) => (
              <li key={index} className="flex items-center space-x-2">
                {req.met ? (
                  <Check
                    size={16}
                    className="text-emerald-500"
                    aria-hidden="true"
                  />
                ) : (
                  <X
                    size={16}
                    className="text-muted-foreground/80"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`text-xs ${
                    req.met ? "text-emerald-600" : "text-muted-foreground"
                  }`}
                >
                  {req.text}
                  <span className="sr-only">
                    {req.met ? " - Requirement met" : " - Requirement not met"}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* 24. Radio Group */}
        <div className="space-y-2">
          <Label>Radio Group</Label>
          <RadioGroup defaultValue="option1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option1" id="option1" />
              <Label htmlFor="option1">Option 1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option2" id="option2" />
              <Label htmlFor="option2">Option 2</Label>
            </div>
          </RadioGroup>
        </div>

        {/* 25. Select */}
        <div className="space-y-2">
          <Label htmlFor="select">Select</Label>
          <Select>
            <SelectTrigger id="select">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 26. Slider */}
        <div className="space-y-2">
          <Label htmlFor="slider">Slider</Label>
          <Slider defaultValue={[50]} max={100} step={1} />
        </div>

        {/* 27. Input with Left Icon */}
        <div className="space-y-2">
          <Label htmlFor="left-icon">Input with Left Icon</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              @
            </span>
            <Input id="left-icon" className="pl-10" placeholder="username" />
          </div>
        </div>

        {/* 28. Input with Right Icon */}
        <div className="space-y-2">
          <Label htmlFor="right-icon">Input with Right Icon</Label>
          <div className="relative">
            <Input id="right-icon" className="pr-10" placeholder="Search" />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        {/* 29. Input with Prefix */}
        <div className="space-y-2">
          <Label htmlFor="prefix">Input with Prefix</Label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              http://
            </span>
            <Input
              id="prefix"
              className="rounded-l-none"
              placeholder="example.com"
            />
          </div>
        </div>

        {/* 30. Input with Suffix */}
        <div className="space-y-2">
          <Label htmlFor="suffix">Input with Suffix</Label>
          <div className="flex">
            <Input id="suffix" className="rounded-r-none" placeholder="0.00" />
            <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              USD
            </span>
          </div>
        </div>

        {/* 31. Underlined Input */}
        <div className="space-y-2">
          <Label htmlFor="underlined">Underlined Input</Label>
          <Input
            id="underlined"
            className="border-t-0 border-x-0 rounded-none px-0 border-b-2 focus:ring-0"
            placeholder="Underlined input"
          />
        </div>

        {/* 32. Animated Label Input */}
        <div className="relative">
          <Input id="animated" placeholder=" " className="peer pt-8" />
          <Label
            htmlFor="animated"
            className="absolute left-2 top-2 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500"
          >
            Animated Label
          </Label>
        </div>

        {/* 33. OTP Input */}
        <div className="space-y-2">
          <Label>OTP Input</Label>
          <div className="flex space-x-2">
            <Input className="w-12 text-center" maxLength={1} />
            <Input className="w-12 text-center" maxLength={1} />
            <Input className="w-12 text-center" maxLength={1} />
            <Input className="w-12 text-center" maxLength={1} />
          </div>
        </div>

        {/* 34. Clearable Input */}
        <div className="space-y-2">
          <Label htmlFor="clearable">Clearable Input</Label>
          <div className="relative">
            <Input id="clearable" placeholder="Type something..." />
            <Button
              type="button"
              variant="ghost"
              className="absolute inset-y-0 right-0 px-3 flex items-center"
            >
              ✕
            </Button>
          </div>
        </div>

        {/* 35. Password with Strength Meter */}
        <div className="space-y-2">
          <Label htmlFor="password-strength">
            Password with Strength Meter
          </Label>
          <Input id="password-strength" type="password" />
          <div className="h-2 bg-gray-200 rounded-full mt-2">
            <div className="h-full w-1/4 bg-red-500 rounded-full"></div>
          </div>
        </div>

        {/* 36. Input with Character Count */}
        <div className="space-y-2">
          <Label htmlFor="char-count">Input with Character Count</Label>
          <div className="relative">
            <Input id="char-count" maxLength={50} className="pr-16" />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500">
              0/50
            </div>
          </div>
        </div>

        {/* 37. Autocomplete Input */}
        <div className="space-y-2">
          <Label htmlFor="autocomplete">Autocomplete Input</Label>
          <Input id="autocomplete" list="fruits" placeholder="Type a fruit" />
          <datalist id="fruits">
            <option value="Apple" />
            <option value="Banana" />
            <option value="Cherry" />
            <option value="Date" />
            <option value="Elderberry" />
          </datalist>
        </div>

        {/* 38. Credit Card Input */}
        <div className="space-y-2">
          <Label htmlFor="credit-card">Credit Card Input</Label>
          <Input
            id="credit-card"
            placeholder="0000 0000 0000 0000"
            className="[&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        {/* 39. Phone Number Input */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number Input</Label>
          <Input
            id="phone"
            placeholder="(000) 000-0000"
            className="[&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        {/* 40. Currency Input */}
        <div className="space-y-2">
          <Label htmlFor="currency">Currency Input</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              $
            </span>
            <Input
              id="currency"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="pl-7"
            />
          </div>
        </div>

        {/* 41. Tag Input */}
        <div className="space-y-2">
          <Label htmlFor="tag">Tag Input</Label>
          <div className="flex flex-wrap gap-2 p-2 border rounded">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              Tag 1
            </span>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              Tag 2
            </span>
            <Input
              id="tag"
              placeholder="Add a tag"
              className="flex-grow border-0 focus:ring-0"
            />
          </div>
        </div>

        {/* 42. Quantity Input */}
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity Input</Label>
          <div className="flex">
            <Button type="button" variant="outline" className="rounded-r-none">
              -
            </Button>
            <Input
              id="quantity"
              type="number"
              defaultValue={1}
              min={1}
              className="rounded-none text-center w-20"
            />
            <Button type="button" variant="outline" className="rounded-l-none">
              +
            </Button>
          </div>
        </div>

        {/* 43. Rich Text Editor (simplified) */}
        <div className="space-y-2">
          <Label htmlFor="rich-text">Rich Text Editor</Label>
          <div className="border rounded">
            <div className="flex border-b p-2 gap-2">
              <Button variant="outline" size="sm">
                B
              </Button>
              <Button variant="outline" size="sm">
                I
              </Button>
              <Button variant="outline" size="sm">
                U
              </Button>
            </div>
            <Textarea
              id="rich-text"
              placeholder="Enter rich text"
              className="border-0"
            />
          </div>
        </div>

        {/* 44. Emoji Picker (simplified) */}
        <div className="space-y-2">
          <Label htmlFor="emoji">Emoji Picker</Label>
          <div className="flex">
            <Input
              id="emoji"
              value={chosenEmoji}
              placeholder="Choose an emoji"
              className="rounded-r-none"
              readOnly
              onClick={() => setIsPickerOpen(!isPickerOpen)}
            />
            <Button
              type="button"
              variant="outline"
              className="rounded-l-none"
              onClick={() => setIsPickerOpen(!isPickerOpen)}
            >
              😊
            </Button>
          </div>
          {isPickerOpen && (
            <div className="absolute z-10 mt-2">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>

        {/* 45. Date Range Picker */}

        {/* 46. Time Zone Picker */}
        <div className="space-y-2">
          <Label htmlFor="timezone">Time Zone Picker</Label>
          <Select>
            <SelectTrigger id="timezone">
              <SelectValue placeholder="Select time zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="utc">UTC</SelectItem>
              <SelectItem value="est">EST</SelectItem>
              <SelectItem value="pst">PST</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 47. Signature Pad (simplified) */}
        <div className="space-y-2">
          <Label htmlFor="signature">Signature Pad</Label>
          <div className="border rounded p-4 text-center">Sign here</div>
        </div>

        {/* 48. Star Rating */}
        <div className="space-y-2">
          <Label>Star Rating</Label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                type="button"
                variant="ghost"
                className="p-0 w-8 h-8"
              >
                <span className="text-2xl text-yellow-400">★</span>
              </Button>
            ))}
          </div>
        </div>

        {/* 49. Toggle Group */}
        <div className="space-y-2">
          <Label>Toggle Group</Label>
          <div className="flex rounded-lg shadow-sm">
            <Button variant="outline" className="rounded-r-none">
              Left
            </Button>
            <Button variant="outline" className="rounded-none border-x-0">
              Middle
            </Button>
            <Button variant="outline" className="rounded-l-none">
              Right
            </Button>
          </div>
        </div>

        {/* 50. Multi-select Dropdown */}
        <div className="space-y-2">
          <Label htmlFor="multi-select">Multi-select Dropdown</Label>
          <Select>
            <SelectTrigger id="multi-select">
              <SelectValue placeholder="Select options" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Date Range Picker</Label>
          <div className="flex space-x-2">
            <Input type="date" className="w-full" />
            <span className="flex items-center">to</span>
            <Input type="date" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
