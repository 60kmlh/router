var content = document.getElementById('content')

content.innerHTML = '首页' + JSON.stringify(router.router.currentPath)