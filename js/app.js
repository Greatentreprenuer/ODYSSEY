document.addEventListener('DOMContentLoaded', () => {
    // personalize
    const userJson = localStorage.getItem('odysseyUser');
    if (userJson) {
        const user = JSON.parse(userJson);
        const name = user.name || 'Traveler';

        // Update header greeting if we had a specific place for it, 
        // or just insert it into the "Curated Selection" text
        const header = document.querySelector('header h2');
        if (header) {
            header.innerText = `Welcome, ${name}.`;
        }

        const subheader = document.querySelector('header p');
        if (subheader) {
            const val = user.values.length > 0 ? user.values[0] : 'Intent';
            subheader.innerText = `Matches curated for ${val} and Deep Connection.`;
        }
    }
});
