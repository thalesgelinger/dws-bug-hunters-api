export default function Home() {
  return (
    <div>
      <h1>Available Endpoints</h1>

      <ul>
        <li>
          <h4>Characters</h4>
          <span>GET /api/characters</span> <br />
          <span>POST /api/characters</span> <br />
          <span>PATCH /api/characters/:id</span>
        </li>

        <li>
          <h4>Tasks</h4>
          <span>GET /api/tasks</span>
        </li>
        <li>
          <h4>Equipment</h4>
          <span>GET /api/equipment</span>
        </li>
        <li>
          <h4>Factions</h4>
          <span>GET /api/factions</span>
        </li>
      </ul>
    </div>
  );
}
