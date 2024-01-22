import React, { useState } from 'react';
import { Stack, Box, Button, Typography } from '@mui/material';

const Payments = () => {
    const [transactionId, setTransactionId] = useState(null);
    const [upiQrData, setUpiQrData] = useState(null);

    const generateUpiQr = async () => {
        // Replace with your actual UPI identifier and API endpoint
        const apiUrl = 'http://localhost:4000/generate-upi-qr';
        const yourUpiIdentifier = 'varrshinie123@okaxis'; // Replace with your UPI identifier

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: 'varrshinie', // Replace with actual user ID
                    amount: 100, // Replace with actual payment amount
                    receiverUpi: yourUpiIdentifier,
                }),
            });

            const data = await response.json();
            setTransactionId(data.transactionId);
            setUpiQrData(data.upiQrData);
        } catch (error) {
            console.error('Error generating UPI QR code:', error);
        }
    };

    return (
        <Stack direction="column" spacing={25} alignItems="center">
            <Box>
                <Typography variant="h4">Choose Payment Method</Typography>
            </Box>

            {transactionId === null && (
                <Box style={{ display: 'flex', gap: '15px' }}>
                    <Button variant="contained" color="primary" onClick={() => alert('Redirecting to card payment...')}>
                        Pay by Card
                    </Button>

                    <Button variant="contained" color="primary" onClick={generateUpiQr}>
                        Pay with UPI
                    </Button>
                </Box>
            )}

            {transactionId && upiQrData && (
                <Box style={{ marginTop: '20px' }}>
                    <Typography variant="h6">UPI Transaction ID: {transactionId}</Typography>
                    {/* Display UPI QR Code (replace with your preferred QR code library) */}
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(upiQrData)}`} alt="UPI QR Code" />
                </Box>
            )}
        </Stack>
    );
};

export default Payments;
