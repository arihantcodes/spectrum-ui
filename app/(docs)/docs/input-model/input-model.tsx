'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Headphones,
  X,
  FileText,
  ChevronDown,
  ArrowDownNarrowWide,
  Upload,
  Link,
  FolderOpen,
  Search,
  Play,
  Clock,
  Globe,
  Youtube,
  FileImage,
  Copy,
  Star,
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  type: 'pdf' | 'url' | 'audio';
  size?: string;
  duration?: string;
  createdAt: string;
  thumbnail?: string;
  status: 'completed' | 'processing' | 'draft';
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Future Thinking Talk.pdf',
    type: 'pdf',
    size: '45.4 KB',
    createdAt: '2 hours ago',
    status: 'completed',
  },
  {
    id: '2',
    name: 'AI Revolution Article',
    type: 'url',
    duration: '12:34',
    createdAt: '1 day ago',
    status: 'completed',
  },
  {
    id: '3',
    name: 'Tech Trends 2024',
    type: 'audio',
    duration: '8:45',
    createdAt: '3 days ago',
    status: 'processing',
  },
  {
    id: '4',
    name: 'Climate Change Report',
    type: 'pdf',
    size: '2.1 MB',
    createdAt: '1 week ago',
    status: 'draft',
  },
];

export default function InputModel() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('upload');
  const [urlInput, setUrlInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selected, setSelected] = useState('morgan');
  const [selected2, setSelected2] = useState('');
  const [selected3, setSelected3] = useState('');
  const [selected4, setSelected4] = useState('');
  const [selected5, setSelected5] = useState('');
  const [selected6, setSelected6] = useState('');

  const filteredProjects = mockProjects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-4 h-4" />;
      case 'url':
        return <Globe className="w-4 h-4" />;
      case 'audio':
        return <Headphones className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'draft':
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-400';
      default:
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-400';
    }
  };

  if (!isOpen) {
    return (
      <div className="flex items-center justify-center">
        <Button onClick={() => setIsOpen(true)}>Open Audio Show Creator</Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4 ">
      <Card className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <CardContent className="p-4 sm:p-6 lg:p-8 h-full overflow-y-auto">
          <div className="flex items-start justify-between mb-6">
            <div className="flex gap-3 sm:gap-4 flex-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-neutral-800 dark:bg-neutral-700 rounded-2xl flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-base sm:text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                  Create Your Audio Show
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-normal">
                  Drop a document or paste a link — GenFM will instantly turn it into a fully voiced
                  podcast you can preview, edit, and download.
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 -mt-2 -mr-2 shrink-0"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6 sm:mb-8">
            <TabsList className="grid w-full grid-cols-3 rounded-xl p-1 bg-neutral-100 dark:bg-neutral-800">
              <TabsTrigger
                value="upload"
                className="rounded-lg font-medium text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:text-neutral-900 dark:data-[state=active]:bg-neutral-700 dark:data-[state=active]:text-neutral-100"
              >
                <Upload className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Upload File</span>
                <span className="sm:hidden">Upload</span>
              </TabsTrigger>
              <TabsTrigger
                value="url"
                className="rounded-lg font-medium text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:text-neutral-900 dark:data-[state=active]:bg-neutral-700 dark:data-[state=active]:text-neutral-100"
              >
                <Link className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Import via URL</span>
                <span className="sm:hidden">URL</span>
              </TabsTrigger>
              <TabsTrigger
                value="existing"
                className="rounded-lg font-medium text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:text-neutral-900 dark:data-[state=active]:bg-neutral-700 dark:data-[state=active]:text-neutral-100"
              >
                <FolderOpen className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Choose Existing</span>
                <span className="sm:hidden">Existing</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="upload" className="mt-6">
              <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl p-8 text-center bg-neutral-50 dark:bg-neutral-900/50">
                <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-neutral-900 dark:text-neutral-100">
                  Drop your file here
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Support for PDF, DOCX, TXT files up to 10MB
                </p>
                <Button
                  variant="outline"
                  className="border-neutral-300 dark:border-neutral-700 bg-transparent"
                >
                  Browse Files
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="url" className="mt-6">
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="url-input"
                    className="text-sm font-medium text-neutral-900 dark:text-neutral-100"
                  >
                    Content URL
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="url-input"
                      type="url"
                      placeholder="https://example.com/article or YouTube URL"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="w-full h-12 rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2 p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50">
                    <Globe className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">Articles</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50">
                    <Youtube className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">YouTube</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50">
                    <FileText className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">Blogs</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50">
                    <FileImage className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">News</span>
                  </div>
                </div>
                {urlInput && (
                  <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
                        <Globe className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                          Ready to import content
                        </p>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                          {urlInput}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="existing" className="mt-6">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
                  />
                </div>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => setSelectedProject(project.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedProject === project.id
                          ? 'border-neutral-400 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800'
                          : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 bg-white dark:bg-neutral-900/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
                          {getProjectIcon(project.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                              {project.name}
                            </p>
                            <Badge
                              className={`text-xs px-2 py-0.5 ${getStatusColor(project.status)}`}
                            >
                              {project.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-neutral-600 dark:text-neutral-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {project.createdAt}
                            </span>
                            {project.size && <span>{project.size}</span>}
                            {project.duration && (
                              <span className="flex items-center gap-1">
                                <Play className="w-3 h-3" />
                                {project.duration}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="w-8 h-8">
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="w-8 h-8">
                            <Star className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <div className="space-y-6">
            <div>
              <Label className="block text-sm font-medium mb-3 text-neutral-900 dark:text-neutral-100">
                Format Style
              </Label>
              <Select defaultValue="default" onValueChange={setSelected5}>
                <SelectTrigger className="w-full border-neutral-300 dark:border-neutral-700 rounded-xl h-12 bg-white dark:bg-neutral-900">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                      {selected5 || 'Interview Mode'}
                    </span>
                    <div className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-2 py-1 mr-2 rounded-md text-xs">
                      Default
                    </div>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Interview Mode</SelectItem>
                  <SelectItem value="narrative">Narrative Style</SelectItem>
                  <SelectItem value="discussion">Panel Discussion</SelectItem>
                  <SelectItem value="monologue">Solo Monologue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <Label className="block text-sm font-medium mb-3 text-neutral-900 dark:text-neutral-100">
                  Host Voice
                </Label>
                <Select defaultValue="alex" onValueChange={setSelected2}>
                  <SelectTrigger className="w-full border-neutral-300 dark:border-neutral-700 rounded-xl h-12 bg-white dark:bg-neutral-900">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src="/voice1.png" alt="Alex" />
                      </Avatar>
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">
                        {selected2 || 'alex'}
                      </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alex">Alex</SelectItem>
                    <SelectItem value="sarah">Sarah</SelectItem>
                    <SelectItem value="mike">Mike</SelectItem>
                    <SelectItem value="emma">Emma</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-sm font-medium mb-3 text-neutral-900 dark:text-neutral-100">
                  Guest Voice
                </Label>
                <Select defaultValue="morgan" onValueChange={setSelected}>
                  <SelectTrigger className="w-full border-neutral-300 dark:border-neutral-700 rounded-xl h-12 bg-white dark:bg-neutral-900">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src="/voice2.png" alt="Morgan" />
                      </Avatar>
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">
                        {selected}
                      </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morgan">Morgan</SelectItem>
                    <SelectItem value="jordan">Jordan</SelectItem>
                    <SelectItem value="taylor">Taylor</SelectItem>
                    <SelectItem value="casey">Casey</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <Label className="block text-sm font-medium mb-3 text-neutral-900 dark:text-neutral-100">
                  Voice Engine
                </Label>
                <Select defaultValue="eleven-v2" onValueChange={setSelected3}>
                  <SelectTrigger className="w-full border-neutral-300 dark:border-neutral-700 rounded-xl h-12 bg-white dark:bg-neutral-900">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">
                        {selected3 || 'Eleven AI v2'}
                      </span>
                      <div className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-2 py-1 mr-2 rounded-md text-xs">
                        Multilingual
                      </div>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eleven-v2">Eleven AI v2</SelectItem>
                    <SelectItem value="eleven-v1">Eleven AI v1</SelectItem>
                    <SelectItem value="openai">OpenAI TTS</SelectItem>
                    <SelectItem value="azure">Azure Speech</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-sm font-medium mb-3 text-neutral-900 dark:text-neutral-100">
                  Language
                </Label>
                <Select defaultValue="auto" onValueChange={setSelected4}>
                  <SelectTrigger className="w-full border-neutral-300 dark:border-neutral-700 rounded-xl h-12 bg-white dark:bg-neutral-900">
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                      {selected4 || 'Auto-detect'}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto-detect</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="italian">Italian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="block text-sm font-medium mb-3 text-neutral-900 dark:text-neutral-100">
                Audio Quality
              </Label>
              <Select defaultValue="studio" onValueChange={setSelected6}>
                <SelectTrigger className="w-full border-neutral-300 dark:border-neutral-700 rounded-xl h-12 bg-white dark:bg-neutral-900">
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">
                    {selected6 || 'Studio Quality'}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="studio">Studio Quality</SelectItem>
                  <SelectItem value="high">High Quality</SelectItem>
                  <SelectItem value="standard">Standard Quality</SelectItem>
                  <SelectItem value="compressed">Compressed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-5 mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <Button
              variant="outline"
              className="rounded-xl px-4 sm:px-6 h-12 border-neutral-300 dark:border-neutral-700 bg-transparent text-sm flex items-center justify-center order-2 sm:order-1"
            >
              <ArrowDownNarrowWide className="h-4 w-4 mr-2" />
              Recent
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <Button className="bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900 text-white rounded-xl px-6 sm:px-8 h-12 font-medium order-1 sm:order-2">
              Generate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
