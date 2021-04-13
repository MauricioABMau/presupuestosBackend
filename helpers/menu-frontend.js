const getMenuFrontEnd = (role = 'USER_ROLE') => {
    const menu = [{
            titulo: 'Menu Principal',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Main', url: '/' },
                { titulo: 'Proyecto', url: 'proyecto' },
                { titulo: 'Item', url: 'item' },
            ]
        },
        {
            titulo: 'Proyecto',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                { titulo: 'Presupuesto', url: 'presupuesto' },
            ]
        },
        {
            titulo: 'Item',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                { titulo: 'Herramienta', url: 'estimacionHerramienta' },
                { titulo: 'Mano de obra', url: 'estimacionManoObra' },
                { titulo: 'Material', url: 'estimacionMaterial' },
            ]
        }
    ]

    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({
            titulo: 'Gasto',
            url: 'gasto'
        })
        menu[2].submenu.unshift({
            titulo: 'Usuario',
            url: 'usuario'
        })

    }
    return menu;
}

module.exports = {
    getMenuFrontEnd
}