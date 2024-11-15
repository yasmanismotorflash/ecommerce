// type Log {
//   id: ID!
//   endpoint: String!
//   request: JSON!
//   status: Int!
//   response: JSON!
//   createdAt: String!
// }

export const Item = [
  {
    name: "id",
    type: "id",
    label: "ID",
    inList: true,
  },
  {
    name: "endpoint",
    type: "string",
    label: "Endpoint",
    inList: true,
  },
  {
    name: "request",
    type: "json",
    label: "Request",
    inList: true,
  },
  {
    name: "status",
    type: "int",
    label: "Status",
    inList: true,
  },
  {
    name: "response",
    type: "json",
    label: "Response",
    inList: true,
  },
  {
    name: "createdAt",
    type: "string",
    label: "Created At",
    inList: true,
  },
]
