new Vue({
    el: '#personaList',
    data: {
        personas: []
    },
    mounted() {
        this.loadPersonas();
    },
    methods: {
        async loadPersonas() {
            const response = await fetch('http://localhost:3000/api/personas');
            this.personas = await response.json();
        },
        async agregarPersona() {
            const formData = new FormData();
            formData.append('nombre', document.getElementById('nombre').value);
            formData.append('edad', document.getElementById('edad').value);
            formData.append('imagen', document.getElementById('imagen').files[0]);

            await fetch('http://localhost:3000/api/personas', {
                method: 'POST',
                body: formData
            });
            document.getElementById('nombre').value = '';
            document.getElementById('edad').value = '';
            document.getElementById('imagen').value = '';
            this.loadPersonas();
        },
        async eliminarPersona(index) {
            await fetch(`http://localhost:3000/api/personas/${index}`, { method: 'DELETE' });
            this.loadPersonas();
        }
    }
});
