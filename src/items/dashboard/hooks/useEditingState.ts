import { useCallback, useEffect, useState } from 'react';

type EditingStateListener = (isEditing: boolean) => void;

class EditingStateManager {
  private isEditing: boolean = false;
  private listeners: Set<EditingStateListener> = new Set();

  setEditing(value: boolean): void {
    this.isEditing = value;
    this.listeners.forEach((listener) => listener(value));
  }

  getEditing(): boolean {
    return this.isEditing;
  }

  subscribe(listener: EditingStateListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

const editingStateManager = new EditingStateManager();

export function useEditingState() {
  const [isEditing, setIsEditing] = useState(() =>
    editingStateManager.getEditing()
  );

  useEffect(() => {
    return editingStateManager.subscribe(setIsEditing);
  }, []);

  const setEditing = useCallback((value: boolean) => {
    editingStateManager.setEditing(value);
  }, []);

  return { isEditing, setEditing };
}
