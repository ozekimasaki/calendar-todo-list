import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from 'date-fns'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { Todo } from '@/types/todo'
import { formatDateKey, isSameDayComparison } from '@/lib/date-utils'
import { cn } from '@/lib/utils'

interface TodoCalendarProps {
  todos: Todo[]
  selectedDate: Date | null
  onDateSelect: (date: Date) => void
}

export function TodoCalendar({ todos, selectedDate, onDateSelect }: TodoCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)

  const startDate = new Date(monthStart)
  startDate.setDate(startDate.getDate() - monthStart.getDay())

  const endDate = new Date(monthEnd)
  endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay()))

  const days = eachDayOfInterval({ start: startDate, end: endDate })

  const getTodosForDate = (date: Date) => {
    return todos.filter(todo => isSameDayComparison(todo.date, date))
  }

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handleDateClick = (date: Date) => {
    onDateSelect(date)
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePreviousMonth}
              className="h-9 w-9"
            >
              <CaretLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextMonth}
              className="h-9 w-9"
            >
              <CaretRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div
              key={day}
              className="text-center text-sm font-semibold text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}

          {days.map((day, idx) => {
            const dayTodos = getTodosForDate(day)
            const isSelected = selectedDate && isSameDayComparison(day, selectedDate)
            const isCurrentMonth = isSameMonth(day, currentMonth)
            const isTodayDate = isToday(day)

            return (
              <button
                key={idx}
                onClick={() => handleDateClick(day)}
                className={cn(
                  'min-h-[60px] p-2 rounded-lg transition-all duration-200 flex flex-col items-center justify-start gap-1',
                  'hover:bg-secondary hover:scale-105',
                  isSelected && 'bg-accent text-accent-foreground scale-100 hover:scale-105',
                  !isCurrentMonth && 'text-muted-foreground opacity-40',
                  isTodayDate && !isSelected && 'ring-2 ring-accent ring-offset-2',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                )}
              >
                <span
                  className={cn(
                    'text-base font-bold tabular-nums',
                    isTodayDate && !isSelected && 'text-accent'
                  )}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {format(day, 'd')}
                </span>
                
                {dayTodos.length > 0 && (
                  <div className="flex gap-0.5 flex-wrap justify-center">
                    {dayTodos.length <= 3 ? (
                      dayTodos.map((todo) => (
                        <div
                          key={todo.id}
                          className={cn(
                            'w-1.5 h-1.5 rounded-full',
                            todo.completed ? 'bg-muted-foreground' : isSelected ? 'bg-accent-foreground' : 'bg-accent'
                          )}
                        />
                      ))
                    ) : (
                      <>
                        {dayTodos.slice(0, 2).map((todo) => (
                          <div
                            key={todo.id}
                            className={cn(
                              'w-1.5 h-1.5 rounded-full',
                              todo.completed ? 'bg-muted-foreground' : isSelected ? 'bg-accent-foreground' : 'bg-accent'
                            )}
                          />
                        ))}
                        <div className={cn(
                          'w-1.5 h-1.5 rounded-full',
                          isSelected ? 'bg-accent-foreground' : 'bg-accent'
                        )} />
                      </>
                    )}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
