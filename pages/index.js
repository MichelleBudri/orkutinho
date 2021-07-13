import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { OrkutinhoMenu, OrkutNostalgicIconSet } from '../src/lib/orkutinhoCommons' // importando individualmente o componente menu
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations' // importando individualmente o componente menu

function ProfileSidebar(propriedade) { 
  //Importando propriedade e utilizando a variável em um elemento html
  console.log(propriedade);
  return (
    <Box>
      <img src={`https://github.com/${propriedade.githubUser}.png`} style={{ borderRadius:'8px' }} /> 
    </Box>
  )
}

export default function Home() {
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
        </div>

        <div className="profileRelationsArea" style={{ gridArea:'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
            Meus Amigos ({meusAmigos.length})
            </h2>

            <ul>
              {meusAmigos.map((itemAtual) =>{
                return(
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>  
          <Box>
            Comunidades
          </Box>  
        </div>
      </MainGrid>
    </>
  )
}
