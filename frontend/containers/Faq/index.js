import React, {Fragment} from 'react';
import {Icon} from 'react-icons-kit';
import {plusCircled} from 'react-icons-kit/ionicons/plusCircled';
import {minusCircled} from 'react-icons-kit/ionicons/minusCircled';
import Text from '../../elements/Text';
import Heading from '../../elements/Heading';
import Container from '../../components/UI/Container';
import {
    Accordion,
    AccordionBody,
    AccordionItem,
    AccordionTitle,
    CloseIcon,
    IconWrapper,
    OpenIcon,
} from '../../components/Accordion';
import FaqSection, {FaqSectionHeader} from './faq.style';

import faq from '../../data/Faq';

const Faq = () => {
  const { slogan, title, faqs } = faq;
  return (
    <FaqSection id="faq">
      <Container>
        <FaqSectionHeader>
          <Heading as="h5" content={slogan} />
          <Heading content={title} />
        </FaqSectionHeader>
        <Accordion>
          <Fragment>
            {faqs.map(item => (
              <AccordionItem key={`accordion-key--${item.id}`}>
                <Fragment>
                  <AccordionTitle>
                    <Fragment>
                      <Heading as="h3" content={item.question} />
                      <IconWrapper className="icon-wrapper">
                        <OpenIcon>
                          <Icon icon={minusCircled} size={18} />
                        </OpenIcon>
                        <CloseIcon>
                          <Icon icon={plusCircled} size={18} />
                        </CloseIcon>
                      </IconWrapper>
                    </Fragment>
                  </AccordionTitle>
                  <AccordionBody>
                    <Text content={item.answer} />
                  </AccordionBody>
                </Fragment>
              </AccordionItem>
            ))}
          </Fragment>
        </Accordion>
      </Container>
    </FaqSection>
  );
};

export default Faq;
