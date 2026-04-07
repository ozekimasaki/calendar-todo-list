# Planning Guide

A todo list application integrated with a calendar view that allows users to create, manage, and organize tasks by date, providing both temporal and task-focused perspectives on their workload.

**Experience Qualities**:
1. **Organized** - The interface should feel structured and methodical, helping users gain clarity on their tasks across time
2. **Fluid** - Interactions between the calendar and task list should feel seamless, with smooth transitions that maintain user context
3. **Empowering** - Users should feel in control of their time and tasks, with clear visual feedback that motivates completion

**Complexity Level**: Light Application (multiple features with basic state)
This app combines task management with calendar visualization, requiring state management for todos and date selection, but remains focused on core CRUD operations without complex business logic.

## Essential Features

### Create Todo
- **Functionality**: Users can add new tasks with a title, optional description, and associated date
- **Purpose**: Enables users to quickly capture tasks and assign them to specific days
- **Trigger**: Click "Add Task" button or select a date on the calendar
- **Progression**: Click add button → Input field appears → Enter task details → Press Enter or click save → Task appears in list and on calendar date
- **Success criteria**: New task appears in the task list, is associated with the selected date, and shows a visual indicator on the calendar

### View Tasks by Date
- **Functionality**: Calendar displays visual indicators for dates with tasks; clicking a date filters the task list
- **Purpose**: Provides temporal context for task planning and helps users see workload distribution
- **Trigger**: Click on any date in the calendar view
- **Progression**: Click date → Calendar highlights selected date → Task list filters to show only tasks for that date → User can view all tasks or return to selected date view
- **Success criteria**: Clicking a date shows only tasks for that date, with clear indication of the selected date and option to view all tasks

### Complete/Uncomplete Tasks
- **Functionality**: Toggle task completion status with visual feedback
- **Purpose**: Track progress and provide satisfaction of completion
- **Trigger**: Click checkbox next to task
- **Progression**: Click checkbox → Task strikes through → Completion state persists → Calendar updates if needed
- **Success criteria**: Task appearance changes immediately, state persists across sessions, completed tasks remain visible but visually distinct

### Edit Tasks
- **Functionality**: Modify task title, description, or date after creation
- **Purpose**: Allows users to refine tasks or reschedule as plans change
- **Trigger**: Click on task or edit button
- **Progression**: Click task → Edit mode activates → Modify details → Click outside or save → Changes persist
- **Success criteria**: Changes save immediately, calendar updates if date changed, no data loss during editing

### Delete Tasks
- **Functionality**: Remove tasks from the system
- **Purpose**: Clean up completed or cancelled tasks
- **Trigger**: Click delete button on task
- **Progression**: Click delete → Confirmation (optional) → Task removed from list → Calendar updates
- **Success criteria**: Task disappears from both list and calendar, deletion persists across sessions

### Calendar Navigation
- **Functionality**: Navigate between months and years
- **Purpose**: Access tasks across different time periods
- **Trigger**: Click previous/next month buttons
- **Progression**: Click navigation → Calendar transitions to new month → Task indicators update → Selected date clears or maintains
- **Success criteria**: Smooth month transitions, task indicators appear correctly for all dates, current date remains highlighted

## Edge Case Handling

- **Empty States**: Show helpful messaging when no tasks exist for selected date or overall, guiding users to create their first task
- **Long Task Titles**: Truncate with ellipsis in compact views, show full text in expanded state or tooltip
- **Many Tasks Per Day**: Show count indicator on calendar date, display all in scrollable task list when date selected
- **Date Navigation Boundaries**: Limit calendar to reasonable past/future range (e.g., ±2 years from current date)
- **Rapid Interactions**: Debounce or queue rapid state changes to prevent data inconsistencies
- **Past Due Tasks**: Optionally highlight overdue incomplete tasks in a distinct color

## Design Direction

The design should evoke a sense of calm productivity and temporal awareness, blending the structured grid of a calendar with the fluid nature of task management. It should feel like a premium planning tool that respects the user's time and mental energy.

## Color Selection

A sophisticated palette that balances energy with tranquility, using a vibrant accent to motivate action while maintaining a clean, professional foundation.

- **Primary Color**: Deep navy blue (oklch(0.25 0.06 260)) - Conveys professionalism, structure, and trustworthiness for the main calendar grid and primary actions
- **Secondary Colors**: Soft slate gray (oklch(0.95 0.01 260)) for backgrounds, creating subtle depth without overwhelming; Medium gray (oklch(0.55 0.01 260)) for secondary text and borders
- **Accent Color**: Vibrant coral (oklch(0.68 0.18 25)) - Energetic and warm, used for CTAs, selected states, and completion celebrations
- **Foreground/Background Pairings**:
  - Background White (oklch(0.99 0 0)): Dark navy text (oklch(0.25 0.06 260)) - Ratio 9.2:1 ✓
  - Primary Navy (oklch(0.25 0.06 260)): White text (oklch(0.99 0 0)) - Ratio 9.2:1 ✓
  - Accent Coral (oklch(0.68 0.18 25)): White text (oklch(0.99 0 0)) - Ratio 4.9:1 ✓
  - Secondary Slate (oklch(0.95 0.01 260)): Dark navy text (oklch(0.25 0.06 260)) - Ratio 7.8:1 ✓

## Font Selection

Typography should feel modern and geometric for the calendar structure, paired with excellent readability for task content.

- **Display/Headings**: Space Grotesk - A geometric sans-serif that feels contemporary and organized, perfect for month headers and section titles
- **Body/Tasks**: Inter - Highly readable with excellent number rendering for dates and consistent appearance across weights

- **Typographic Hierarchy**:
  - H1 (Month/Year Header): Space Grotesk Bold/32px/tight letter-spacing -0.02em
  - H2 (Section Headers): Space Grotesk Semibold/20px/normal
  - Calendar Date Numbers: Inter Bold/16px/tabular numbers
  - Task Title: Inter Medium/15px/line-height 1.4
  - Task Description: Inter Regular/14px/line-height 1.5/text-muted-foreground
  - Button Labels: Inter Medium/14px/letter-spacing 0.01em

## Animations

Animations should feel purposeful and snappy, providing immediate feedback for interactions while maintaining the sense of a physical planning tool. Use subtle motion to guide attention to state changes.

- **Task Completion**: Checkbox fills with accent color (150ms ease-out), task text strikes through with slight fade (200ms ease-in-out)
- **Calendar Date Selection**: Smooth background color transition (200ms) with subtle scale effect (0.98 → 1.0)
- **Month Navigation**: Calendar slides horizontally with fade (300ms ease-in-out) suggesting page-turning
- **Task Add/Delete**: Slide in from bottom for new tasks (250ms spring), fade out and compress height for deletion (200ms ease-in)
- **Date Indicators**: Subtle pulse effect on today's date, scale bounce when tasks added to a date

## Component Selection

- **Components**:
  - **Calendar**: Use shadcn Calendar component as foundation, heavily customized with task indicators (small dots/badges) beneath date numbers
  - **Card**: Wrap calendar and task list in separate Cards for visual hierarchy and breathing room
  - **Button**: Primary buttons for "Add Task" (accent color), secondary for calendar navigation
  - **Checkbox**: Task completion toggles using shadcn Checkbox with accent color when checked
  - **Input**: Text input for task creation with clean focus states
  - **Textarea**: For optional task descriptions in expanded/edit mode
  - **Dialog**: For task editing with larger form (if needed)
  - **Popover**: Quick-add task form when clicking calendar date
  - **ScrollArea**: For task list when many tasks exist
  - **Badge**: Count indicators on calendar dates with multiple tasks

- **Customizations**:
  - Custom calendar cell component to render task indicators (colored dots below date number)
  - Custom task list item with integrated checkbox, edit, and delete actions
  - Empty state illustrations or messaging for "No tasks" states

- **States**:
  - **Buttons**: Default has subtle border, hover lifts slightly with shadow, active scales down (0.97), disabled at 50% opacity
  - **Checkboxes**: Unchecked has border, hover shows light background, checked fills with coral accent and shows checkmark
  - **Calendar Dates**: Default is neutral, hover shows light background, selected has coral background, today has border ring, dates-with-tasks show dot indicators
  - **Task Items**: Default is clean, hover shows action buttons (edit/delete), active/editing shows expanded form

- **Icon Selection**:
  - Plus (task creation)
  - X (close/delete)
  - CaretLeft/CaretRight (month navigation)
  - Pencil (edit task)
  - Trash (delete task)
  - Check (task completion)
  - CalendarBlank (empty state)

- **Spacing**:
  - Container padding: p-6 (24px)
  - Card gap: gap-6 (24px between calendar and tasks)
  - Task list items: py-3 px-4 with gap-3 between elements
  - Calendar cells: p-2 with gap-1 for multi-line content
  - Button padding: px-4 py-2 for medium, px-6 py-3 for large

- **Mobile**:
  - Stack calendar above task list vertically with full width
  - Calendar remains interactive but cells become larger touch targets (min 44px)
  - Task list becomes primary focus with calendar collapsible or in tab
  - Month navigation buttons increase in size
  - Add task button becomes floating action button in bottom-right corner
  - Reduce padding to p-4 for containers, gap-4 for spacing
