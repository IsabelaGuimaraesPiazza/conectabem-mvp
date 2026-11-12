# ConectaBem — MVP de Gestão de Estoque e Doações

Aplicação web *mobile-first* desenvolvida para otimizar a triagem de mantimentos, o controle de validade de lotes e a distribuição acessível para beneficiários em galpões comunitários.

## Funcionalidades do MVP (3 Telas)
1. **Autenticação (Login):** Acesso rápido e seguro para voluntários operacionais.
2. **Gestão de Estoque e Triagem:** Cadastro de lotes de alimentos com quantidade e data de validade, exibidos em tabela dinâmica.
3. **Alertas e Beneficiários:** Identificação visual acessível (alto contraste + ícones universais + texto) de itens próximos ao vencimento e vínculo direto com famílias beneficiárias.

## Tecnologias Utilizadas
- **Frontend:** HTML5 Semântico, CSS3 (Mobile-First e WCAG Alto Contraste), JavaScript (ES6+).
- **Lógica & Testes:** Python 3.11 (`pytest`) para regras de negócio e cálculo de validade.
- **Qualidade & CI:** GitHub Actions para execução automatizada de testes unitários e de integração.

## Como Executar Localmente
1. Clone o repositório:
   ```bash
   git clone [https://github.com/seu-usuario/conectabem-mvp.git](https://github.com/seu-usuario/conectabem-mvp.git)
