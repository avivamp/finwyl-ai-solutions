import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  featured: boolean;
}

interface BlogEditorProps {
  blogPosts: BlogPost[];
  onBlogPostsChange: (posts: BlogPost[]) => void;
}

const BlogEditor = ({ blogPosts, onBlogPostsChange }: BlogEditorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    author: "",
    category: "AI & Technology",
    readTime: "",
    featured: false
  });
  const { toast } = useToast();

  const categories = [
    "AI & Technology", 
    "Engineering",
    "Machine Learning",
    "Cloud & DevOps",
    "Web Development"
  ];

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      author: "",
      category: "AI & Technology",
      readTime: "",
      featured: false
    });
    setEditingPost(null);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      author: post.author,
      category: post.category,
      readTime: post.readTime,
      featured: post.featured
    });
    setIsOpen(true);
  };

  const handleSave = async () => {
    try {
      const postData = {
        title: formData.title,
        excerpt: formData.excerpt,
        author: formData.author,
        category: formData.category,
        readTime: formData.readTime,
        featured: formData.featured,
        date: editingPost ? editingPost.date : new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        updatedAt: new Date()
      };

      if (editingPost) {
        // Update existing post
        await updateDoc(doc(db, "blogPosts", editingPost.id), postData);
        const updatedPosts = blogPosts.map(p => 
          p.id === editingPost.id ? { ...p, ...postData } : p
        );
        onBlogPostsChange(updatedPosts);
      } else {
        // Add new post
        const docRef = await addDoc(collection(db, "blogPosts"), {
          ...postData,
          createdAt: new Date()
        });
        const newPost = { id: docRef.id, ...postData } as BlogPost;
        onBlogPostsChange([...blogPosts, newPost]);
      }

      toast({
        title: "Success",
        description: `Blog post ${editingPost ? 'updated' : 'created'} successfully`,
      });

      setIsOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      await deleteDoc(doc(db, "blogPosts", postId));
      const filteredPosts = blogPosts.filter(p => p.id !== postId);
      onBlogPostsChange(filteredPosts);
      
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="fixed bottom-16 right-4 z-50 space-y-2">
        <Button onClick={() => setIsOpen(true)} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Blog Post
        </Button>
      </div>

      {/* Edit buttons for existing posts */}
      {blogPosts.map((post) => (
        <div key={post.id} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity space-x-1">
          <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
            <Edit className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      ))}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPost ? "Edit Blog Post" : "Add New Blog Post"}
            </DialogTitle>
            <DialogDescription>
              Fill in the blog post details below
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Blog post title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief description of the blog post"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="Author name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="readTime">Read Time</Label>
              <Input
                id="readTime"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                placeholder="e.g., 5 min read"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded border-gray-300"
              />
              <Label htmlFor="featured">Featured Post</Label>
            </div>
            <Button onClick={handleSave}>
              {editingPost ? "Update Post" : "Create Post"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BlogEditor;