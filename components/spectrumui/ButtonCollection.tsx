"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Copy from "@/components/HandleCopy";
import {
  RiCloseCircleLine,
  RiDeleteBin5Fill,
  RiFacebookFill,
  RiGithubFill,
  RiGoogleFill,
  RiTwitterXFill,
} from "@remixicon/react";
import {
  AlertCircle,
  ArrowRight,
  Bell,
  Check,
  ChevronRight,
  Download,
  Edit,
  ExternalLink,
  Eye,
  EyeOff,
  Filter,
  Heart,
  HelpCircle,
  Home,
  Info,
  LoaderCircle,
  Lock,
  LogIn,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  MoreHorizontal,
  Play,
  Plus,
  RefreshCw,
  Save,
  Search,
  Send,
  Settings,
  Share,
  ShoppingCart,
  Star,
  Sun,
  Trash,
  Upload,
  User,
  UserPlus,
  X,
} from "lucide-react";

export default function ImportantButtons() {
  const buttons = [
    {
      name: "primaryButton",
      component: PrimaryButton,
      code: `<Button>Primary</Button>`,
    },
    {
      name: "secondaryButton",
      component: SecondaryButton,
      code: `<Button variant="secondary">Secondary</Button>`,
    },
    {
      name: "outlineButton",
      component: OutlineButton,
      code: `<Button variant="outline">Outline</Button>`,
    },
    {
      name: "ghostButton",
      component: GhostButton,
      code: `<Button variant="ghost">Ghost</Button>`,
    },
    {
      name: "destructiveButton",
      component: DestructiveButton,
      code: `<Button variant="destructive">Destructive</Button>`,
    },
    {
      name: "linkButton",
      component: LinkButton,
      code: `<Button variant="link">Link</Button>`,
    },
    {
      name: "iconButton",
      component: IconButton,
      code: `<Button size="icon"><Plus className="h-4 w-4" /></Button>`,
    },
    {
      name: "loadingButton",
      component: LoadingButton,
      code: `<Button disabled><LoaderCircle className="mr-2 h-4 w-4 animate-spin" />Loading</Button>`,
    },
    {
      name: "submitButton",
      component: SubmitButton,
      code: `<Button type="submit">Submit</Button>`,
    },
    {
      name: "resetButton",
      component: ResetButton,
      code: `<Button type="reset">Reset</Button>`,
    },
    {
      name: "loginButton",
      component: LoginButton,
      code: `<Button><LogIn className="mr-2 h-4 w-4" />Log In</Button>`,
    },
    {
      name: "logoutButton",
      component: LogoutButton,
      code: `<Button><LogOut className="mr-2 h-4 w-4" />Log Out</Button>`,
    },
    {
      name: "signupButton",
      component: SignupButton,
      code: `<Button><UserPlus className="mr-2 h-4 w-4" />Sign Up</Button>`,
    },
    {
      name: "deleteButton",
      component: DeleteButton,
      code: `<Button variant="destructive"><Trash className="mr-2 h-4 w-4" />Delete</Button>`,
    },
    {
      name: "editButton",
      component: EditButton,
      code: `<Button><Edit className="mr-2 h-4 w-4" />Edit</Button>`,
    },
    {
      name: "saveButton",
      component: SaveButton,
      code: `<Button><Save className="mr-2 h-4 w-4" />Save</Button>`,
    },
    {
      name: "cancelButton",
      component: CancelButton,
      code: `<Button variant="outline"><X className="mr-2 h-4 w-4" />Cancel</Button>`,
    },
    {
      name: "searchButton",
      component: SearchButton,
      code: `<Button><Search className="mr-2 h-4 w-4" />Search</Button>`,
    },
    {
      name: "filterButton",
      component: FilterButton,
      code: `<Button><Filter className="mr-2 h-4 w-4" />Filter</Button>`,
    },
    {
      name: "downloadButton",
      component: DownloadButton,
      code: `<Button><Download className="mr-2 h-4 w-4" />Download</Button>`,
    },
    {
      name: "uploadButton",
      component: UploadButton,
      code: `<Button><Upload className="mr-2 h-4 w-4" />Upload</Button>`,
    },
    {
      name: "shareButton",
      component: ShareButton,
      code: `<Button><Share className="mr-2 h-4 w-4" />Share</Button>`,
    },
    {
      name: "settingsButton",
      component: SettingsButton,
      code: `<Button><Settings className="mr-2 h-4 w-4" />Settings</Button>`,
    },
    {
      name: "helpButton",
      component: HelpButton,
      code: `<Button><HelpCircle className="mr-2 h-4 w-4" />Help</Button>`,
    },
    {
      name: "infoButton",
      component: InfoButton,
      code: `<Button><Info className="mr-2 h-4 w-4" />Info</Button>`,
    },
    {
      name: "alertButton",
      component: AlertButton,
      code: `<Button><AlertCircle className="mr-2 h-4 w-4" />Alert</Button>`,
    },
    {
      name: "menuButton",
      component: MenuButton,
      code: `<Button><Menu className="mr-2 h-4 w-4" />Menu</Button>`,
    },
    {
      name: "cartButton",
      component: CartButton,
      code: `<Button><ShoppingCart className="mr-2 h-4 w-4" />Cart</Button>`,
    },
    {
      name: "favoriteButton",
      component: FavoriteButton,
      code: `<Button><Heart className="mr-2 h-4 w-4" />Favorite</Button>`,
    },
    {
      name: "ratingButton",
      component: RatingButton,
      code: `<Button><Star className="mr-2 h-4 w-4" />Rate</Button>`,
    },
    {
      name: "sendButton",
      component: SendButton,
      code: `<Button><Send className="mr-2 h-4 w-4" />Send</Button>`,
    },
    {
      name: "refreshButton",
      component: RefreshButton,
      code: `<Button><RefreshCw className="mr-2 h-4 w-4" />Refresh</Button>`,
    },
    {
      name: "moreButton",
      component: MoreButton,
      code: `<Button><MoreHorizontal className="mr-2 h-4 w-4" />More</Button>`,
    },
    {
      name: "homeButton",
      component: HomeButton,
      code: `<Button><Home className="mr-2 h-4 w-4" />Home</Button>`,
    },
    {
      name: "profileButton",
      component: ProfileButton,
      code: `<Button><User className="mr-2 h-4 w-4" />Profile</Button>`,
    },
    {
      name: "messageButton",
      component: MessageButton,
      code: `<Button><MessageCircle className="mr-2 h-4 w-4" />Message</Button>`,
    },
    {
      name: "darkModeToggle",
      component: DarkModeToggle,
      code: `<Button><Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /><Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /></Button>`,
    },
    {
      name: "showPasswordToggle",
      component: ShowPasswordToggle,
      code: `<Button><Eye className="h-4 w-4" /></Button>`,
    },
    {
      name: "externalLinkButton",
      component: ExternalLinkButton,
      code: `<Button>Visit Site <ExternalLink className="ml-2 h-4 w-4" /></Button>`,
    },
    {
      name: "nextButton",
      component: NextButton,
      code: `<Button>Next <ChevronRight className="ml-2 h-4 w-4" /></Button>`,
    },
    {
      name: "confirmButton",
      component: ConfirmButton,
      code: `<Button><Check className="mr-2 h-4 w-4" />Confirm</Button>`,
    },
    {
      name: "lockButton",
      component: LockButton,
      code: `<Button><Lock className="mr-2 h-4 w-4" />Lock</Button>`,
    },
    {
      name: "subscribeButton",
      component: SubscribeButton,
      code: `<Button><Mail className="mr-2 h-4 w-4" />Subscribe</Button>`,
    },
    {
      name: "callToActionButton",
      component: CallToActionButton,
      code: `<Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>`,
    },
    {
      name: "expandButton",
      component: ExpandButton,
      code: `<Button className="rounded-full"><Plus className="h-4 w-4" /></Button>`,
    },
    {
      name: "scrollToTopButton",
      component: ScrollToTopButton,
      code: `<Button className="rounded-full fixed bottom-4 right-4"><ArrowRight className="h-4 w-4 -rotate-90" /></Button>`,
    },
    {
      name: "copyButton",
      component: CopyButton,
      code: `<Button>Copy <Check className="ml-2 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" /></Button>`,
    },
    {
      name: "audioControlButton",
      component: AudioControlButton,
      code: `<Button className="rounded-full bg-white text-black hover:bg-gray-200"><Play className="h-4 w-4" /></Button>`,
    },
    {
      name: "notificationButton",
      component: NotificationButton,
      code: `<Button className="relative"><Bell className="h-4 w-4" /><span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span></Button>`,
    },
    {
      name: "LoginGoogle",
      component: LoginGoogle,
      code: `  <Button variant="outline">
    <RiGoogleFill
      className="me-3 text-[#DB4437]"
      size={16}
      aria-hidden="true"
    />
    Login with Google
  </Button>`,
    },
    {
      name: "Loginx",
      component: Loginx,
      code: `  <Button variant="outline">
    <RiTwitterXFill className="me-3 text-[#14171a]" size={16} aria-hidden="true" />
    Login with X
  </Button>`,
    },
    {
      name: "LoginFacebook",
      component: LoginFacebook,
      code: ` <Button variant="outline">
    <RiFacebookFill className="me-3 text-[#1877f2]" size={16} aria-hidden="true" />
    Login with Facebook
  </Button>`,
    },
    {
      name: "LoginGithub",
      component: LoginGithub,
      code: `  <Button variant="outline">
    <RiGithubFill className="me-3 text-[#333333]" size={16} aria-hidden="true" />
    Login with GitHub
  </Button>`,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 grid-cols-1 ml-6">
      {buttons.map(({ name, component: ButtonComponent, code }) => (
        <div key={name} className="relative group">
          <Card className="w-[240px] h-[100px] flex items-center justify-center">
            <ButtonComponent />
          </Card>
          <div className="absolute top-2 left-48 hidden group-hover:flex">
            <Copy content={code} />
          </div>
        </div>
      ))}
    </div>
  );
}

// Button components
export function PrimaryButton() {
  return <Button>Primary</Button>;
}

export function SecondaryButton() {
  return <Button variant="secondary">Secondary</Button>;
}

export function OutlineButton() {
  return <Button variant="outline">Outline</Button>;
}

export function GhostButton() {
  return <Button variant="ghost">Ghost</Button>;
}

export function DestructiveButton() {
  return <Button variant="destructive">Destructive</Button>;
}

export function LinkButton() {
  return <Button variant="link">Link</Button>;
}

export function IconButton() {
  return (
    <Button size="icon">
      <Plus className="h-4 w-4" />
    </Button>
  );
}

export function LoadingButton() {
  return (
    <Button disabled>
      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      Loading
    </Button>
  );
}

export function SubmitButton() {
  return <Button type="submit">Submit</Button>;
}

export function ResetButton() {
  return <Button type="reset">Reset</Button>;
}

export function LoginButton() {
  return (
    <Button>
      <LogIn className="mr-2 h-4 w-4" />
      Log In
    </Button>
  );
}

export function LogoutButton() {
  return (
    <Button>
      <LogOut className="mr-2 h-4 w-4" />
      Log Out
    </Button>
  );
}

export function SignupButton() {
  return (
    <Button>
      <UserPlus className="mr-2 h-4 w-4" />
      Sign Up
    </Button>
  );
}

export function DeleteButton() {
  return (
    <Button variant="destructive">
      <Trash className="mr-2 h-4 w-4" />
      Delete
    </Button>
  );
}

export function EditButton() {
  return (
    <Button>
      <Edit className="mr-2 h-4 w-4" />
      Edit
    </Button>
  );
}

export function SaveButton() {
  return (
    <Button>
      <Save className="mr-2 h-4 w-4" />
      Save
    </Button>
  );
}

export function CancelButton() {
  return (
    <Button variant="outline">
      <X className="mr-2 h-4 w-4" />
      Cancel
    </Button>
  );
}

export function SearchButton() {
  return (
    <Button>
      <Search className="mr-2 h-4 w-4" />
      Search
    </Button>
  );
}

export function FilterButton() {
  return (
    <Button>
      <Filter className="mr-2 h-4 w-4" />
      Filter
    </Button>
  );
}

export function DownloadButton() {
  return (
    <Button>
      <Download className="mr-2 h-4 w-4" />
      Download
    </Button>
  );
}

export function UploadButton() {
  return (
    <Button>
      <Upload className="mr-2 h-4 w-4" />
      Upload
    </Button>
  );
}

export function ShareButton() {
  return (
    <Button>
      <Share className="mr-2 h-4 w-4" />
      Share
    </Button>
  );
}

export function SettingsButton() {
  return (
    <Button>
      <Settings className="mr-2 h-4 w-4" />
      Settings
    </Button>
  );
}

export function HelpButton() {
  return (
    <Button>
      <HelpCircle className="mr-2 h-4 w-4" />
      Help
    </Button>
  );
}

export function InfoButton() {
  return (
    <Button>
      <Info className="mr-2 h-4 w-4" />
      Info
    </Button>
  );
}

export function AlertButton() {
  return (
    <Button>
      <AlertCircle className="mr-2 h-4 w-4" />
      Alert
    </Button>
  );
}

export function MenuButton() {
  return (
    <Button>
      <Menu className="mr-2 h-4 w-4" />
      Menu
    </Button>
  );
}

export function CartButton() {
  return (
    <Button>
      <ShoppingCart className="mr-2 h-4 w-4" />
      Cart
    </Button>
  );
}

export function FavoriteButton() {
  return (
    <Button>
      <Heart className="mr-2 h-4 w-4" />
      Favorite
    </Button>
  );
}

export function RatingButton() {
  return (
    <Button>
      <Star className="mr-2 h-4 w-4" />
      Rate
    </Button>
  );
}

export function SendButton() {
  return (
    <Button>
      <Send className="mr-2 h-4 w-4" />
      Send
    </Button>
  );
}

export function RefreshButton() {
  return (
    <Button>
      <RefreshCw className="mr-2 h-4 w-4" />
      Refresh
    </Button>
  );
}

export function MoreButton() {
  return (
    <Button>
      <MoreHorizontal className="mr-2 h-4 w-4" />
      More
    </Button>
  );
}

export function HomeButton() {
  return (
    <Button>
      <Home className="mr-2 h-4 w-4" />
      Home
    </Button>
  );
}

export function ProfileButton() {
  return (
    <Button>
      <User className="mr-2 h-4 w-4" />
      Profile
    </Button>
  );
}

export function MessageButton() {
  return (
    <Button>
      <MessageCircle className="mr-2 h-4 w-4" />
      Message
    </Button>
  );
}

export function DarkModeToggle() {
  return (
    <Button>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

export function ShowPasswordToggle() {
  return (
    <Button>
      <Eye className="h-4 w-4" />
    </Button>
  );
}

export function ExternalLinkButton() {
  return (
    <Button>
      Visit Site <ExternalLink className="ml-2 h-4 w-4" />
    </Button>
  );
}

export function NextButton() {
  return (
    <Button>
      Next <ChevronRight className="ml-2 h-4 w-4" />
    </Button>
  );
}

export function ConfirmButton() {
  return (
    <Button>
      <Check className="mr-2 h-4 w-4" />
      Confirm
    </Button>
  );
}

export function LockButton() {
  return (
    <Button>
      <Lock className="mr-2 h-4 w-4" />
      Lock
    </Button>
  );
}

export function SubscribeButton() {
  return (
    <Button>
      <Mail className="mr-2 h-4 w-4" />
      Subscribe
    </Button>
  );
}

export function CallToActionButton() {
  return (
    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
      Get Started <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );
}

export function ExpandButton() {
  return (
    <Button className="rounded-2xl h-8 w-8">
      <Plus className="h-4 w-4" />
    </Button>
  );
}

export function ScrollToTopButton() {
  return (
    <Button className="rounded-full  bottom-4 right-4">
      Back To Top
      <ArrowRight className="h-4 w-4 -rotate-90" />
    </Button>
  );
}

export function CopyButton() {
  return (
    <Button>
      Copy{" "}
      <Check className="ml-2 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
    </Button>
  );
}

export function AudioControlButton() {
  return (
    <Button className="rounded-full bg-white text-black hover:bg-gray-200">
      <Play className="h-4 w-4" />
    </Button>
  );
}

export function NotificationButton() {
  return (
    <Button className="relative">
      <Bell className="h-4 w-4" />
      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
    </Button>
  );
}

export function LoginGoogle() {
  return (
    <Button variant="outline">
      <RiGoogleFill
        className="me-3 text-[#DB4437]"
        size={16}
        aria-hidden="true"
      />
      Login with Google
    </Button>
  );
}

export function Loginx() {
  return (
    <Button variant="outline">
      <RiTwitterXFill
        className="me-3 text-[#14171a]"
        size={16}
        aria-hidden="true"
      />
      Login with X
    </Button>
  );
}

export function LoginFacebook() {
  return (
    <Button variant="outline">
      <RiFacebookFill
        className="me-3 text-[#1877f2]"
        size={16}
        aria-hidden="true"
      />
      Login with Facebook
    </Button>
  );
}

export function LoginGithub() {
  return (
    <Button variant="outline">
      <RiGithubFill
        className="me-3 text-[#333333]"
        size={16}
        aria-hidden="true"
      />
      Login with GitHub
    </Button>
  );
}
