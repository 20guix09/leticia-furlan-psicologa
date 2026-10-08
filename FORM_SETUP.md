# Formulário de contato

O formulário já envia diretamente por AJAX para o FormSubmit e usa o e-mail do visitante como endereço de resposta. Não existe etapa de copiar ou preparar uma mensagem.

Para habilitar o envio:

1. Em `dist/form-config.js`, preencha `recipient` com o e-mail destinatário da Letícia ou o token de endereço fornecido pelo FormSubmit.
2. Publique a alteração.
3. Faça o teste inicial e confirme a ativação no e-mail do destinatário, seguindo as instruções do FormSubmit. Depois, teste novamente e confira o recebimento e a resposta ao visitante.

Enquanto `recipient` estiver vazio, o site não transmite os dados e mostra que o envio ainda está indisponível. Falhas de rede preservam os campos preenchidos.

A validação local verifica o formato do e-mail e a plausibilidade de um número brasileiro, incluindo DDD. Ela não confirma a existência de uma caixa de e-mail nem de uma conta do WhatsApp. Essa confirmação exigiria fluxo externo de confirmação.

Documentação: https://formsubmit.co/documentation e https://formsubmit.co/ajax-documentation.
