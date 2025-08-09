# Chatbot Flow Builder

A React-based visual flow builder for creating chatbot conversation flows using React Flow.

## Features

- **Visual Flow Builder**: Drag and drop interface for creating chatbot conversation flows
- **Node Management**: Add, edit, and connect text nodes to build conversation paths
- **Real-time Validation**: Validates flow structure before saving
- **Database Persistence**: Save flows to PostgreSQL database
- **Modern UI**: Clean, responsive interface with toast notifications

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Flow Engine**: React Flow
- **Backend**: Next.js 14 API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd react-flow
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@host:port/database"
```

4. Set up the database:

```bash
npx prisma generate
npx prisma db push
```

5. Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Usage

### Creating a Flow

1. **Add Nodes**: Drag text nodes from the right panel onto the canvas
2. **Edit Content**: Click on a node to edit its text content
3. **Connect Nodes**: Drag from a node's handle to another node to create connections
4. **Validate Flow**: The system ensures:
   - At least 2 nodes are present
   - Only one entry point exists
   - Source handles have only one connection

### Saving Flows

- Click the "Save Changes" button in the top bar
- The flow will be validated and saved to the database
- A success toast will appear when saved successfully
- The save button shows a loading state during the save operation

### Flow Structure

Each flow consists of:

- **Nodes**: Text messages with positions and content
- **Edges**: Connections between nodes defining conversation flow
- **Metadata**: Flow name, creation date, and update timestamps

## API Endpoints

### POST /api/flows

Save a new flow to the database.

**Request Body:**

```json
{
  "name": "Flow Name",
  "nodes": [...],
  "edges": [...]
}
```

**Response:**

```json
{
  "message": "Flow saved successfully",
  "flow": { ... }
}
```

### GET /api/flows

Retrieve all saved flows.

**Response:**

```json
[
  {
    "id": "flow_id",
    "name": "Flow Name",
    "nodes": [...],
    "edges": [...],
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

## Database Schema

The application uses three main tables:

- **Flow**: Stores flow metadata
- **Node**: Stores individual nodes with positions and data
- **Edge**: Stores connections between nodes

## Development

### Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   └── page.tsx        # Main page
├── components/         # React components
├── hooks/             # Custom React hooks
├── lib/               # Utility libraries
└── icons/             # Icon components
```

### Key Components

- **FlowCanvas**: Main flow builder interface
- **TextNode**: Editable text node component
- **TopBar**: Application header with save functionality
- **NodesPanel**: Sidebar with draggable node types

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License
