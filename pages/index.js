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

export default function Home() {
  const [comunidades, setComunidades] = React.useState([{
    id: '42434323434223432',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  const githubUser = "michellebudri";
  const meusAmigos = ['juunegreiros', 'peas', 'luluvisotto', 'omariosouto', 'ricardoresende', 'guilhermeCSA-dev']

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
            Bem vindo(a)
          </h1>

          <OrkutNostalgicIconSet/>
        </Box>

        <Box>
          <h2 className="subTitle">O que você deseja fazer?</h2>
          <form onSubmit={function handleCriaComunidade(e){ // Evento onSubmit chama a function
            e.preventDefault(); // Cancelando o evento de carregamento da página
            const dadosDoForm = new FormData(e.target); // Retornando dados do formulário

            const comunidade = {
              id: new Date().toISOString(), // Armazenando a data e hora do elemento
              title: dadosDoForm.get('title'),
              image: dadosDoForm.get('image')
            }
            const comunidadesAtualizadas = [...comunidades, comunidade];
            setComunidades(comunidadesAtualizadas);
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
          <Box>
            <h2 className="smallTitle">
              Minhas comunidades ({comunidades.length})
            </h2>

            <ProfileRelationsBoxWrapper>
            <ul>
              {comunidades.map((itemAtual) =>{
                return(
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          </Box>  
        </div>
      </MainGrid>
    </>
  )
}