import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [recados, setRecados] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");

  useEffect(() => {
    carregarRecados();
  }, []);

  async function carregarRecados() {
    const res = await axios.get("http://localhost:8000/api/recados");
    setRecados(res.data);
  }

  async function criarRecado(e) {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/recados", {
      titulo,
      texto,
      user_id: 1
    });
    setTitulo("");
    setTexto("");
    carregarRecados();
  }

  async function deletarRecado(id) {
    await axios.delete(`http://localhost:8000/api/recados/${id}`);
    carregarRecados();
  }

  // leve rotação alternada nos cartões, pra parecer post-its colados na mesa
  const tilt = (i) => (i % 2 === 0 ? "-0.6deg" : "0.6deg");

  return (
    <div style={styles.page}>
      <style>{css}</style>

      <header style={styles.header}>
        <span style={styles.kicker}>caderno de notas</span>
        <h1 style={styles.title}>Recados</h1>
      </header>

      <form onSubmit={criarRecado} style={styles.form}>
        <input
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={styles.input}
          className="campo"
        />
        <textarea
          placeholder="Escreva o recado aqui..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          style={styles.textarea}
          className="campo"
        />
        <button style={styles.button} className="botao-criar">
          Adicionar recado
        </button>
      </form>

      <div style={styles.list}>
        {recados.length === 0 && (
          <p style={styles.empty}>Nenhum recado ainda. Escreva o primeiro acima.</p>
        )}

        {recados.map((r, i) => (
          <div
            key={r.id}
            style={{ ...styles.card, transform: `rotate(${tilt(i)})` }}
            className="cartao"
          >
            <div style={styles.cardHead}>
              <h3 style={styles.cardTitle}>{r.titulo}</h3>
              <button
                onClick={() => deletarRecado(r.id)}
                style={styles.deleteButton}
                className="botao-apagar"
                aria-label="Apagar recado"
                title="Apagar"
              >
                ×
              </button>
            </div>
            <p style={styles.cardText}>{r.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    background: "#eae6dd",
    minHeight: "100vh",
    padding: "48px 20px 80px"
  },
  header: {
    textAlign: "center",
    marginBottom: 36
  },
  kicker: {
    display: "block",
    fontSize: 12,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#8a8276",
    marginBottom: 6
  },
  title: {
    fontFamily: "Georgia, 'Iowan Old Style', 'Times New Roman', serif",
    fontSize: 40,
    fontWeight: 400,
    color: "#2c2a26",
    margin: 0
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    maxWidth: 420,
    margin: "0 auto 44px",
    background: "#fffdf8",
    padding: 20,
    borderRadius: 4,
    boxShadow: "0 1px 2px rgba(40,30,10,0.08), 0 8px 20px rgba(40,30,10,0.06)"
  },
  input: {
    padding: "10px 12px",
    borderRadius: 3,
    border: "1px solid #ddd6c8",
    fontSize: 15,
    fontFamily: "inherit",
    color: "#2c2a26",
    background: "#fffefb",
    outline: "none"
  },
  textarea: {
    padding: "10px 12px",
    borderRadius: 3,
    border: "1px solid #ddd6c8",
    minHeight: 80,
    fontSize: 15,
    fontFamily: "inherit",
    color: "#2c2a26",
    background: "#fffefb",
    resize: "vertical",
    outline: "none"
  },
  button: {
    padding: "11px 16px",
    borderRadius: 3,
    border: "none",
    background: "#3f5945",
    color: "#fdfbf5",
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "0.02em",
    cursor: "pointer",
    marginTop: 4
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 22,
    maxWidth: 760,
    margin: "0 auto"
  },
  empty: {
    gridColumn: "1 / -1",
    textAlign: "center",
    color: "#8a8276",
    fontStyle: "italic"
  },
  card: {
    background: "#fff8e1",
    padding: "16px 18px",
    borderRadius: 2,
    boxShadow: "0 1px 1px rgba(40,30,10,0.1), 0 6px 14px rgba(40,30,10,0.12)",
    minHeight: 120,
    display: "flex",
    flexDirection: "column"
  },
  cardHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
    borderBottom: "1px solid rgba(60,50,20,0.12)",
    paddingBottom: 8,
    marginBottom: 10
  },
  cardTitle: {
    margin: 0,
    fontFamily: "Georgia, 'Iowan Old Style', 'Times New Roman', serif",
    fontSize: 18,
    color: "#2c2a26",
    lineHeight: 1.3
  },
  cardText: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.55,
    color: "#4a463d",
    whiteSpace: "pre-wrap"
  },
  deleteButton: {
    flexShrink: 0,
    width: 24,
    height: 24,
    lineHeight: "22px",
    textAlign: "center",
    padding: 0,
    background: "transparent",
    color: "#a8554f",
    border: "1px solid rgba(168,85,79,0.4)",
    borderRadius: "50%",
    fontSize: 16,
    cursor: "pointer"
  }
};

const css = `
  .campo:focus {
    border-color: #3f5945 !important;
    box-shadow: 0 0 0 3px rgba(63,89,69,0.12);
  }
  .botao-criar {
    transition: background 0.15s ease;
  }
  .botao-criar:hover {
    background: #344a39;
  }
  .cartao {
    transition: transform 0.18s ease, box-shadow 0.18s ease;
  }
  .cartao:hover {
    transform: rotate(0deg) translateY(-3px) !important;
    box-shadow: 0 2px 2px rgba(40,30,10,0.12), 0 12px 22px rgba(40,30,10,0.16) !important;
  }
  .botao-apagar {
    transition: background 0.15s ease, color 0.15s ease;
  }
  .botao-apagar:hover {
    background: #a8554f;
    color: #fff8e1;
  }
`;

export default App;
