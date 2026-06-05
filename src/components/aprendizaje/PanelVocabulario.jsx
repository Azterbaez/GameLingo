const PanelVocabulario = ({ titulo, resumen, vocabulario }) => {
  if (!vocabulario?.length) return null;

  return (
    <section className="learn-panel" aria-labelledby="vocab-heading">
      <div className="learn-panel__head">
        <h3 id="vocab-heading">
          <i className="bi bi-lightbulb me-2" aria-hidden />
          {titulo}
        </h3>
        {resumen && <p>{resumen}</p>}
      </div>
      <table className="table learn-vocab-table mb-0">
        <thead>
          <tr>
            <th scope="col">Inglés</th>
            <th scope="col">Español</th>
          </tr>
        </thead>
        <tbody>
          {vocabulario.map((item) => (
            <tr key={item.en}>
              <td>{item.en}</td>
              <td>{item.es}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default PanelVocabulario;
