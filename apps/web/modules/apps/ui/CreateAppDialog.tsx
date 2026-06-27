"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAppSchema, CreateAppInput } from "../validation/app.schema";
import { useAppsViewModel } from "../viewmodels/useAppsViewModel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

interface CreateAppDialogProps {
  projectId: string;
  onAppCreated: () => void;
}

export function CreateAppDialog({ projectId, onAppCreated }: CreateAppDialogProps) {
  const [open, setOpen] = useState(false);
  const { createApp, uploadAppAsset, isUploading } = useAppsViewModel(projectId);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<CreateAppInput>({
    resolver: zodResolver(CreateAppSchema),
    defaultValues: {
      name: "",
      platform: "ANDROID",
      storeUrl: "",
      bundleId: "",
    },
  });

  const onSubmit = async (data: CreateAppInput) => {
    try {
      let storeUrl = data.storeUrl;
      
      // If a file was uploaded, upload to Supabase and use that URL
      if (file) {
        storeUrl = await uploadAppAsset(file, data.platform);
      }

      await createApp({
        ...data,
        storeUrl,
      });

      setOpen(false);
      form.reset();
      setFile(null);
      onAppCreated();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Add App
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Application</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>App Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Awesome App" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Platform</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ANDROID">Android</SelectItem>
                      <SelectItem value="IOS">iOS</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bundleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bundle ID / Package Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="com.example.app" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2 pt-2 border-t border-border/50">
              <label className="text-sm font-medium leading-none">App Binary (Optional)</label>
              <div className="flex items-center gap-4">
                <Input 
                  type="file" 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Upload your APK or IPA for AI Audit.
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isUploading || form.formState.isSubmitting}>
              {(isUploading || form.formState.isSubmitting) ? "Saving..." : "Add Application"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
