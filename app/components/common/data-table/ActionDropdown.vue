<template>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="h-8 w-8 p-0">
          <span class="sr-only">Open menu</span>
          <MoreHorizontal class="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Hành động</DropdownMenuLabel>
        
        <!-- Default Actions -->
        <DropdownMenuItem v-if="showCopyId" @click="copyId">
          Sao chép ID
        </DropdownMenuItem>
        
        <DropdownMenuSeparator v-if="showCopyId && (showDelete || showEdit)" />
        
        <!-- Custom Actions Slot -->
        <slot />
        
        <!-- Built-in Actions -->
        <template v-if="showDelete || showEdit">
          <!-- <DropdownMenuSeparator /> -->
          
          <DropdownMenuItem
            v-if="showDelete"
            class="text-destructive focus:text-destructive"
            @click="handleDelete"
          >
            Xoá
          </DropdownMenuItem>
          
          <DropdownMenuItem v-if="showEdit">
            <NuxtLink :to="editLink" class="w-full">
              Chi tiết/Chỉnh sửa
            </NuxtLink>
          </DropdownMenuItem>
        </template>
      </DropdownMenuContent>
    </DropdownMenu>
  </template>
  
  <script setup lang="ts">
  import { MoreHorizontal } from "lucide-vue-next";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Button } from "@/components/ui/button";
  
  interface Props {
    itemId: string | number
    showCopyId?: boolean
    showDelete?: boolean
    showEdit?: boolean
    editLink?: string
    deleteLabel?: string
  }
  
  const props = withDefaults(defineProps<Props>(), {
    showCopyId: true,
    showDelete: true,
    showEdit: true,
    deleteLabel: "Xoá",
  });
  
  const emit = defineEmits<{
    delete: [string | number]
    copy: [string | number]
  }>();
  
  const copyId = () => {
    navigator.clipboard.writeText(props.itemId.toString());
    emit('copy', props.itemId);
  };
  
  const handleDelete = () => {
    emit('delete', props.itemId);
  };
  </script>