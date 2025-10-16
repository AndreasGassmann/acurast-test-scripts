// Set your random source URLs or generator
const id = Math.floor(Math.random() * 826) + 1;
const target = `https://rickandmortyapi.com/api/character/${id}`;

const randomUrls = [
    target
];

const reportUrl = 'https://webhook.watch/api/res/8b8a1052-9729-40d0-9959-913dd2774e99';

async function main() {
    try {
        const target = randomUrls[Math.floor(Math.random() * randomUrls.length)];

        // Fetch random public URL
        const res = await fetch(target);
        const text = await res.text();

        // Report result
        await fetch(reportUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: target,
                status: res.status,
                content: text.slice(0, 500), // limit payload
            }),
        });

        console.log(`Reported ${target} to ${reportUrl}`);
    } catch (err) {
        console.error('Error:', err);
    }
}

main();
