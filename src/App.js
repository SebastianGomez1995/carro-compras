import './App.css';
import SectionArticle from './componentes/SectionArticle';
import ContentTotal from './componentes/ContentTotal';
import { HStack, Wrap } from '@chakra-ui/react';
import ProductsState from './context/ProductsState';

function App() {
  return (
    <HStack spacing={{ base: "4", md: "8" }} 
    wrap="wrap"
    justify="center" 
    width="100%"
    >
      <ProductsState>
        <SectionArticle/>
        <ContentTotal/>
      </ProductsState>
    </HStack>
  );
}

export default App;
