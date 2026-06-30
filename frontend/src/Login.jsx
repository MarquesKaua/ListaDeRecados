import { useState } from "react";
import api from "./api";

function Login({ onLogin }) {
  const [modo, setModo] = useState("login"); // "login" ou "register"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function enviar(e) {
    e.preventDefault();
    setErro("");

    if (modo === "register" && !name.trim()) {
      setErro("Preencha seu nome.");
      return;
    }
    if (!email.trim() || !password.trim()) {
      setErro("Preencha email e senha.");
      return;
    }

    setCarregando(true);
    try {
      const rota = modo === "login" ? "/login" : "/register";
      const payload =
        modo === "login" ? { email, password } : { name, email, password };

      const res = await api.post(rota, payload);
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.user);
    } catch (err) {
      setErro(
        err.response?.data?.message ||
          "Não foi possível entrar. Confira seus dados."
      );
    } finally {
      setCarregando(false);
    }
  }

  function trocarModo() {
    setModo(modo === "login" ? "register" : "login");
    setErro("");
  }

  return (
    <div style={styles.page}>
      <style>{css}</style>

      <header style={styles.header}>
        <span style={styles.kicker}>caderno de notas</span>
        <h1 style={styles.title}>Recados</h1>
      </header>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>
          {modo === "login" ? "Entrar" : "Criar conta"}
        </h2>
        <p style={styles.subtitle}>
          {modo === "login"
            ? "Acesse seus recados salvos."
            : "Leva menos de um minuto."}
        </p>

        {erro && (
          <div style={styles.alerta}>
            <span>{erro}</span>
            <button
              onClick={() => setErro("")}
              style={styles.alertaFechar}
              aria-label="Fechar aviso"
            >
              ×
            </button>
          </div>
        )}

        <form onSubmit={enviar} style={styles.form}>
          {modo === "register" && (
            <input
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              className="campo"
            />
          )}

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            className="campo"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            className="campo"
          />

          <button
            type="submit"
            style={styles.button}
            className="botao-criar"
            disabled={carregando}
          >
            {carregando
              ? "Aguarde..."
              : modo === "login"
              ? "Entrar"
              : "Cadastrar"}
          </button>
        </form>

        <p style={styles.trocar}>
          {modo === "login" ? "Não tem conta? " : "Já tem conta? "}
          <span onClick={trocarModo} style={styles.link} className="link-troca">
            {modo === "login" ? "Cadastre-se" : "Entrar"}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    background: "#eae6dd",
    minHeight: "100vh",
    padding: "48px 20px 80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  header: {
    textAlign: "center",
    marginBottom: 32
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
  card: {
    width: "100%",
    maxWidth: 360,
    background: "#fffdf8",
    padding: "28px 26px",
    borderRadius: 4,
    boxShadow: "0 1px 2px rgba(40,30,10,0.08), 0 8px 20px rgba(40,30,10,0.06)"
  },
  cardTitle: {
    fontFamily: "Georgia, 'Iowan Old Style', 'Times New Roman', serif",
    fontSize: 24,
    fontWeight: 400,
    color: "#2c2a26",
    margin: "0 0 4px"
  },
  subtitle: {
    fontSize: 14,
    color: "#8a8276",
    margin: "0 0 18px"
  },
  alerta: {
    background: "#fbeceb",
    border: "1px solid #e3b3af",
    color: "#8a342d",
    padding: "10px 14px",
    borderRadius: 4,
    fontSize: 13,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 16
  },
  alertaFechar: {
    background: "transparent",
    border: "none",
    color: "#8a342d",
    fontSize: 18,
    lineHeight: 1,
    cursor: "pointer",
    padding: 0
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10
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
  trocar: {
    textAlign: "center",
    fontSize: 13,
    color: "#5c5648",
    marginTop: 18,
    marginBottom: 0
  },
  link: {
    color: "#3f5945",
    fontWeight: 600,
    cursor: "pointer"
  }
};

const css = `
  .campo:focus {
    border-color: #3f5945 !important;
    box-shadow: 0 0 0 3px rgba(63,89,69,0.12);
  }
  .botao-criar {
    transition: background 0.15s ease, opacity 0.15s ease;
  }
  .botao-criar:hover {
    background: #344a39;
  }
  .botao-criar:disabled {
    opacity: 0.6;
    cursor: default;
  }
  .link-troca:hover {
    text-decoration: underline;
  }
`;

export default Login;