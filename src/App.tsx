import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Todo } from '@/types/todo'
import { TodoCalendar } from '@/components/TodoCalendar'
import { TodoList } from '@/components/TodoList'
import { Toaster, toast } from 'sonner'
import { useIsMobile } from '@/hooks/use-mobile'

function App() {
  const [todos, setTodos] = useKV<Todo[]>('todos', [])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const isMobile = useIsMobile()

  const currentTodos = todos || []

  const handleAddTodo = (newTodo: Omit<Todo, 'id' | 'createdAt'>) => {
    setTodos((currentTodos) => [
      ...(currentTodos || []),
      {
        ...newTodo,
        id: `todo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString()
      }
    ])
    toast.success('Task added successfully')
  }

  const handleToggleComplete = (id: string) => {
    setTodos((currentTodos) =>
      (currentTodos || []).map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const handleDelete = (id: string) => {
    setTodos((currentTodos) => (currentTodos || []).filter(todo => todo.id !== id))
    toast.success('Task deleted')
  }

  const handleUpdate = (id: string, updates: Partial<Todo>) => {
    setTodos((currentTodos) =>
      (currentTodos || []).map(todo =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    )
    toast.success('Task updated')
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleClearFilter = () => {
    setSelectedDate(null)
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 md:mb-8">
          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight mb-2"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
          >
            Calendar Todo
          </h1>
          <p className="text-muted-foreground text-base">
            Organize your tasks across time
          </p>
        </header>

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-2'}`}>
          <div className={isMobile ? 'order-2' : ''}>
            <TodoCalendar
              todos={currentTodos}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />
          </div>
          
          <div className={`${isMobile ? 'order-1 min-h-[500px]' : 'h-[600px]'}`}>
            <TodoList
              todos={currentTodos}
              selectedDate={selectedDate}
              onAddTodo={handleAddTodo}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onClearFilter={handleClearFilter}
            />
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  )
}

export default App