// Funzione per ottenere il saldo
$('#getBalanceButton').click(function() {
    const address = $('#balanceAddress').val();
    if (!address) {
        alert('Inserisci un indirizzo valido');
        return;
    }

    $.ajax({
        url: 'http://localhost:3000/blockchain/showBalance',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ address: address }),
        success: function(response) {
            $('#balanceResult').text(response.balance || 'Saldo non disponibile');
        },
        error: function(error) {
            alert('Errore durante il recupero del saldo' + error);
        }
    });
});

// Funzione per trasferire token
$('#transferButton').click(function() {
    const receiver = $('#receiverAddress').val();
    const amount = $('#transferAmount').val();
    if (!receiver || !amount) {
        alert('Inserisci un indirizzo valido e un ammontare');
        return;
    }

    $.ajax({
        url: 'http://localhost:3000/blockchain/transferTokens',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ receiver: receiver, amount: amount }),
        success: function(response) {
            $('#transferResult').text('Transazione eseguita con successo');
        },
        error: function() {
            alert('Errore durante il trasferimento dei token');
        }
    });
});

// Funzione per mintare token
$('#mintButton').click(function() {
    const receiver = $('#mintReceiver').val();
    const amount = $('#mintAmount').val();
    if (!receiver || !amount) {
        alert('Inserisci un indirizzo valido e un ammontare');
        return;
    }

    $.ajax({
        url: 'http://localhost:3000/blockchain/mintTokens',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ receiver: receiver, amount: amount }),
        success: function(response) {
            $('#mintResult').text('Token generati con successo');
        },
        error: function() {
            alert('Errore durante la creazione dei token');
        }
    });
});
