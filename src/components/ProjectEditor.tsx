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

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  technologies: string[];
  features: string[];
  icon: any; // Can be React component or string
}

interface ProjectEditorProps {
  projects: Project[];
  onProjectsChange: (projects: Project[]) => void;
}

const ProjectEditor = ({ projects, onProjectsChange }: ProjectEditorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "In Development",
    technologies: "",
    features: "",
    icon: "CreditCard"
  });
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "In Development",
      technologies: "",
      features: "",
      icon: "CreditCard"
    });
    setEditingProject(null);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      status: project.status,
      technologies: project.technologies.join(", "),
      features: project.features.join(", "),
      icon: project.icon
    });
    setIsOpen(true);
  };

  const handleSave = async () => {
    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        technologies: formData.technologies.split(",").map(t => t.trim()),
        features: formData.features.split(",").map(f => f.trim()),
        icon: formData.icon,
        updatedAt: new Date()
      };

      if (editingProject) {
        // Update existing project
        await updateDoc(doc(db, "projects", editingProject.id), projectData);
        const updatedProjects = projects.map(p => 
          p.id === editingProject.id ? { ...p, ...projectData } : p
        );
        onProjectsChange(updatedProjects);
      } else {
        // Add new project
        const docRef = await addDoc(collection(db, "projects"), {
          ...projectData,
          createdAt: new Date()
        });
        const newProject = { id: docRef.id, ...projectData } as Project;
        onProjectsChange([...projects, newProject]);
      }

      toast({
        title: "Success",
        description: `Project ${editingProject ? 'updated' : 'created'} successfully`,
      });

      setIsOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (projectId: string) => {
    try {
      await deleteDoc(doc(db, "projects", projectId));
      const filteredProjects = projects.filter(p => p.id !== projectId);
      onProjectsChange(filteredProjects);
      
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="fixed bottom-16 right-4 z-50 space-y-2">
        <Button onClick={() => setIsOpen(true)} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Edit buttons for existing projects */}
      {projects.map((project, index) => (
        <div key={project.id} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity space-x-1">
          <Button size="sm" variant="outline" onClick={() => handleEdit(project)}>
            <Edit className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(project.id)}>
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      ))}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? "Edit Project" : "Add New Project"}
            </DialogTitle>
            <DialogDescription>
              Fill in the project details below
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Project title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Project description"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Development">In Development</SelectItem>
                  <SelectItem value="Beta Testing">Beta Testing</SelectItem>
                  <SelectItem value="Production Ready">Production Ready</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="technologies">Technologies (comma-separated)</Label>
              <Input
                id="technologies"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                placeholder="React, Node.js, Python"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="features">Features (comma-separated)</Label>
              <Textarea
                id="features"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Feature 1, Feature 2, Feature 3"
                rows={2}
              />
            </div>
            <Button onClick={handleSave}>
              {editingProject ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectEditor;