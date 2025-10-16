const reportUrl = 'https://webhook.watch/api/res/8b8a1052-9729-40d0-9959-913dd2774e99';

async function loop() {
    while (true) {
        try {
            // Generate new random character each loop
            const id = Math.floor(Math.random() * 826) + 1;
            const target = `https://rickandmortyapi.com/api/character/${id}`;

            const res = await fetch(target);
            const text = await res.text();

            await fetch(reportUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url: target,
                    status: res.status,
                    content: text.slice(0, 500)
                }),
            });

            console.log(`Reported ${target}`);
        } catch (err) {
            console.error('Error:', err);
        }

        // Wait 5 seconds
        await new Promise(r => setTimeout(r, 5000));
    }
}

loop();
