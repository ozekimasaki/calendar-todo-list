import { useState } from 'react'
import { format } from 'date-fns'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus, CalendarBlank, X } from '@phosphor-icons/react'
import { Todo } from '@/types/todo'
import { TodoItem } from './TodoItem'
import { isSameDayComparison } from '@/lib/date-utils'
import { motion, AnimatePresence } from 'framer-motion'

interface TodoListProps {
  todos: Todo[]
  selectedDate: Date | null
  onAddTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void
  onToggleComplete: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<Todo>) => void
  onClearFilter: () => void
}

export function TodoList({
  todos,
  selectedDate,
  onAddTodo,
  onToggleComplete,
  onDelete,
  onUpdate,
  onClearFilter
}: TodoListProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')

  const filteredTodos = selectedDate
    ? todos.filter(todo => isSameDayComparison(todo.date, selectedDate))
    : todos

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const handleAdd = () => {
    if (newTitle.trim()) {
      onAddTodo({
        title: newTitle.trim(),
        description: newDescription.trim() || undefined,
        date: selectedDate ? selectedDate.toISOString() : new Date().toISOString(),
        completed: false
      })
      setNewTitle('')
      setNewDescription('')
      setIsAdding(false)
    }
  }

  const handleCancel = () => {
    setNewTitle('')
    setNewDescription('')
    setIsAdding(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAdd()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <Card className="p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'All Tasks'}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {sortedTodos.length} {sortedTodos.length === 1 ? 'task' : 'tasks'}
            {sortedTodos.filter(t => t.completed).length > 0 && (
              <> · {sortedTodos.filter(t => t.completed).length} completed</>
            )}
          </p>
        </div>
        {selectedDate && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilter}
          >
            View All
          </Button>
        )}
      </div>

      <div className="flex-1 min-h-0 flex flex-col gap-4">
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="w-full"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Task
          </Button>
        )}

        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-secondary rounded-lg space-y-3"
            >
              <Input
                id="new-task-title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Task title"
                className="font-medium"
                autoFocus
              />
              <Textarea
                id="new-task-description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Description (optional)"
                className="min-h-[60px] resize-none"
              />
              <div className="flex gap-2 justify-end">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCancel}
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleAdd}
                  disabled={!newTitle.trim()}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ScrollArea className="flex-1">
          {sortedTodos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CalendarBlank className="h-16 w-16 text-muted-foreground mb-4 opacity-40" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {selectedDate ? 'No tasks for this date' : 'No tasks yet'}
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                {selectedDate
                  ? 'Click "Add Task" to create a task for this date.'
                  : 'Get started by adding your first task or selecting a date on the calendar.'}
              </p>
            </div>
          ) : (
            <div className="space-y-1 pr-4">
              <AnimatePresence>
                {sortedTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </ScrollArea>
      </div>
    </Card>
  )
}
