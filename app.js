const container = document.getElementById('container');

fetch('/products')
    .then(res => res.json())
    .then(data => {
        const p = document.createElement('p');
        p.classList.add('lead');
        data.forEach(product => {
            p.innerHTML = `${product.name}`;
            container.appendChild(p);
            console.log(product);
        })
})