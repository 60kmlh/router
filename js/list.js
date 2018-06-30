var content = document.getElementById('content')

content.innerHTML = '列表页' + JSON.stringify(router.router.currentPath)
