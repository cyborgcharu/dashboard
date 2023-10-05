## Dashboard

### **Overview:**

**Dashboard** is a frontend visibility application tailored for modern businesses and developers. It connects seamlessly to an API, ingests event data in real-time, and visualizes analytics on a dynamic dashboard. With **Dashboard**, users gain valuable insights into event-driven architectures, helping them optimize applications, understand user behavior, and make data-driven decisions.

### **Key Features:**

1. **Real-time Data Streaming:** The application listens to the configured API constantly and ingests event data in real-time.
2. **Dynamic Visualization:** Leveraging powerful charting libraries, the dashboard represents event data using pie charts, bar graphs, histograms, and time series plots.
3. **Event Filtering:** Users can filter events based on type, source, timestamp, or other custom criteria, ensuring only relevant data is visualized.

### Dependencies**:**

- **Express** for the web server
- **TypeScript** for static type checking
- **Node.js** as the runtime
- **React** as the frontend framework
- **@Material-UI/Core** for UI components
- **Socket.io-client** for websockets
- **Axios** for API communication
- **Chart.js** for charts

### Roadmap:

1. **API Endpoints & Real-time Data Streaming**:
    - **Express Server**: Set up **`socket.io`** to emit event data in real-time.
    - **React Client**: Use the **`socket.io-client`** to listen to the events from the server and update the application state in real-time.
    - **External Data Source**: If your server needs to ingest data from another source (like an external API or database), set up listeners or polling mechanisms. Once the data is received, you can broadcast it to the React client using **`socket.io`**.
2. **Dynamic Visualization**:
    - **Charting Library**: Choose a suitable React charting library like Chart.js, D3.js, or Recharts. Make sure the library can dynamically update based on data changes.
    - **Visualization Components**: Design React components to display data using pie charts, bar graphs, histograms, and time series plots. Each type of chart might represent different facets of your data.
3. **Event Filtering**:
    - **UI Elements**: Create user interface elements like dropdowns, checkboxes, or input fields in your React app to capture filtering criteria.
    - **Filtering Logic**: Depending on your data volume and performance requirements, you can filter data either on the client-side or the server-side.
4. **State Management in React**:
    - With real-time data updates, a robust state management solution becomes crucial. Consider using React's built-in Context API or adopt Redux if you anticipate complex state logic.
    - Ensure that updates to your state, especially those triggered by real-time data, don't cause unnecessary component re-renders. Tools like **`React.memo`** or **`useMemo`** hook can help.
  
### Directory Structure:

/taskManager
|-- /client
|   |-- package-lock.json
|   |-- package.json
|   |-- README.md
|   |-- /node_modules
|   |-- /public
|   |-- /src
|   |   |-- App.js
|   |   |-- App.css
|-- /server
|   |-- package-lock.json
|   |-- package.json
|   |-- tsconfig.json
|   |-- /node_modules
|   |-- /build
|   |-- /src
|   |   |-- server.ts
|   |   |-- /data
|   |   |   |-- mockData.json
|   |   |-- /routes
|   |   |   |-- api.js
|   |   |-- /utils
|   |   |   |-- eventService.ts
