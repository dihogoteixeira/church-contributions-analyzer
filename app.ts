function updateSummary() {
    const total = contributions.reduce((acc, contribution) => acc + contribution.value, 0);
    const amandaTotal = contributions.filter(c => c.congregation === "Amanda").reduce((acc, contribution) => acc + contribution.value, 0);
    const ypeTotal = contributions.filter(c => c.congregation === "Ypê").reduce((acc, contribution) => acc + contribution.value, 0);
    const campoLimpoTotal = contributions.filter(c => c.congregation === "Campo Limpo").reduce((acc, contribution) => acc + contribution.value, 0);

    summary!.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Resumo das Contribuições</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Total Geral: <strong>R$ ${total.toFixed(2)}</strong></li>
                    <li class="list-group-item">Amanda: <strong>R$ ${amandaTotal.toFixed(2)}</strong></li>
                    <li class="list-group-item">Ypê: <strong>R$ ${ypeTotal.toFixed(2)}</strong></li>
                    <li class="list-group-item">Campo Limpo: <strong>R$ ${campoLimpoTotal.toFixed(2)}</strong></li>
                </ul>
            </div>
        </div>
    `;
}
