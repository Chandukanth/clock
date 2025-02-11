Timer Management App

Description

A React Native app built with Expo that allows users to create, manage, and track timers with category-based grouping, progress visualization, history logging, and customizable alerts.

Features

Core Features

Add Timer

Create new timers with:

Name

Duration (in seconds)

Category (e.g., Workout, Study, Break)

Save timers locally using AsyncStorage.

Timer List with Grouping

Display all timers grouped by category.

Expand/collapse sections for better organization.

Show timer details: name, remaining time, and status (Running, Paused, Completed).

Timer Management

Start, Pause, Reset timers.

Mark timers as "Completed" when they reach zero.

Progress Visualization

Show a progress bar or percentage for each timer.

Bulk Actions

Start, Pause, and Reset all timers within a category.

User Feedback

Display a modal with a congratulatory message when a timer completes.

Enhanced Functionality

Timer History

Maintain a log of completed timers with name and completion time.

View the log in a separate "History" screen.

Customizable Alerts

Option to set a halfway alert for each timer.

Display a notification/message when the alert triggers.

Technical Details

State Management: useState and useReducer for managing timers and categories.

Navigation: React Navigation with two screens:

Home Screen: Timer list with grouping functionality.

History Screen: Completed timers log.

Persistence: AsyncStorage for storing timers and logs.

Styling: StyleSheet for a clean and responsive layout.

Timers: setInterval for countdown management.

Setup Instructions

Clone the repository:

git clone [<repository-url>](https://github.com/Chandukanth/clock.git)
cd clock

Install dependencies:

npm install

Start the project:

npm start

Assumptions

Users can create multiple timers in different categories.

Timers run independently and persist even when the app is restarted.

History logs will be stored locally and are not synced to a cloud service.

Halfway alerts will be displayed as notifications within the app.

Dependencies

React Native

Expo

React Navigation

AsyncStorage
