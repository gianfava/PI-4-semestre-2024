### Explicação dos endpoints:

1. /stats/temperatura: Retorna estatísticas relacionadas à temperatura.
2. /stats/umidade: Retorna estatísticas relacionadas à umidade.
3. /stats/geral: Retorna estatísticas gerais, incluindo temperatura, umidade e correlação entre elas.
4. /stats/ultimoDia: Retorna estatísticas das leituras do último dia.

###  Cada endpoint calcula:
- Média
- Mediana
- Desvio padrão
- Valor mínimo
- Valor máximo

O endpoint /stats/geral também calcula a correlação entre temperatura e umidade.

### Para executar esta nova aplicação:

1. Certifique-se de que a API do sensor (projeto anterior) está rodando.

2. Execute este novo projeto: `node app.js`

3. Acesse os endpoints:

    - http://localhost:3001/stats/temperatura
    - http://localhost:3001/stats/umidade
    - http://localhost:3001/stats/geral
    - http://localhost:3001/stats/ultimoDia