import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { OrkutinhoMenu, OrkutinhoProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/orkutinhoCommons' // importando individualmente o componente menu
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations' // importando individualmente o componente menu

function ProfileSidebar(propriedade) { 
  //Importando propriedade e utilizando a variável em um elemento html
  console.log(propriedade);
  return (
    // Transformando o box em sidebar
    <Box as="aside">
      <img src={`https://github.com/${propriedade.githubUser}.png`} style={{ borderRadius:'8px' }} /> 
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedade.githubUser}`}>
          @{propriedade.githubUser}
        </a>
      </p>

      <hr />
      
      <OrkutinhoProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades){
  return(
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
    {propriedades.title} ({propriedades.items.length})
    </h2>

    <ul>
      {/* {seguidores.map((itemAtual) =>{
        return(
          <li key={itemAtual}>
            <a href={`https://github.com/${itemAtual}`}>
              <img src={`https://github.com/${itemAtual}.png`} />
              <span>{itemAtual}</span>
            </a>
          </li>
        )
      })} */}
    </ul>
  </ProfileRelationsBoxWrapper>  
  )
}

export default function Home() {
  const [comunidades, setComunidades] = React.useState([
    {
      id: '42',
      title: 'Amamos gatos',
      image: 'img/gato.jpg'
    },
    {
      id: '43',
      title: 'Eu odeio acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
    },
    {
      id: '44',
      title: 'Fanáticos por filmes e séries',
      image: 'img/filme.jpg'
    }
  ]);
  const githubUser = "michellebudri";
  const firstName = "Michelle";
  const meusAmigos = ['juunegreiros', 'peas', 'luluvisotto', 'omariosouto', 'ricardoresende', 'guilhermeCSA-dev']
  const [seguidores, setSeguidores] = React.useState([]);
  // 0- Pegar o array de dados do github
    React.useEffect(function(){
      fetch('https://api.github.com/users/MichelleBudri/followers')

      .then (function(respostaDoServidor){
        return respostaDoServidor.json();
      })
      .then(function(respostaCompleta){
        setSeguidores(respostaCompleta);
      })

      // API GraphQL
      fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Authorization': '692b4913e0c6233758f4a030afb79b',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ "query": `query {
            allCommunities {
              id 
              title
              imageUrl
              creatorSlug
            }
          }`
        })
      })
      .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
        console.log(comunidadesVindasDoDato)
        setComunidades(comunidadesVindasDoDato)
      })
    }, [])   

  // 1- Criar um box que vai ter um map, baseado nos items do array do github


  return (
    <>
      <OrkutinhoMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea:'profileArea' }}> 
          <ProfileSidebar githubUser={githubUser} />
        </div>
        
        <div className="welcomeArea" style={{ gridArea:'welcomeArea' }}>
        <Box>
          <h1 className="title">
            Bem vindo(a), {firstName}
          </h1>

          <OrkutNostalgicIconSet/>
        </Box>

        <Box>
          <h2 className="subTitle">O que você deseja fazer?</h2>
          <form onSubmit={function handleCriaComunidade(e){ // Evento onSubmit chama a function
            e.preventDefault(); // Cancelando o evento de carregamento da página
            const dadosDoForm = new FormData(e.target); // Retornando dados do formulário

            console.log('Campo: ', dadosDoForm.get('title'));
            console.log('Campo: ', dadosDoForm.get('image'));

            const comunidade = {
              title: dadosDoForm.get('title'),
              imageUrl: dadosDoForm.get('image') || `https://picsum.photos/200?${Date.now()}`,
              creatorSlug: githubUser,
            }

            fetch('/api/comunidades', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(comunidade)
            })
            .then(async (response) => {
              const dados = await response.json();
              console.log(dados.registroCriado);
              const comunidade = dados.registroCriado;
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)
            })

            // const comunidadesAtualizadas = [...comunidades, comunidade];
            // setComunidades(comunidadesAtualizadas);
          }}>

            <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?" 
                  type="text"
                />
            </div>
            <div>
                <input 
                  placeholder="Insira uma url para a capa da comunidade" 
                  name="title" 
                  aria-label="Insira uma url para a capa da comunidade" 
                  type="text"
                />
            </div>
            
            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea:'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores" items={seguidores} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
            Meus amigos ({meusAmigos.length})
            </h2>

            <ul>
              {meusAmigos.map((itemAtual) =>{
                return(
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>  

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Minhas comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.slice(0, 6).map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/comunities/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>   
        </div>
      </MainGrid>
    </>
  )
}