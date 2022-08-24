import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

import TERMS_LOGO from '/public/static/images/pages/terms/ic_terms.svg'

import Hero from 'components/Hero'
import { Container, Title } from 'components/App/StableCoin'

const MainWrap = styled.div``

const TextSpan = styled.span`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 28px;
  padding: 5rem;
  color: ${({ theme }) => theme.text1};
  text-align: justify;
  text-justify: inter-word;

  & > * {
    &:nth-child(1) {
      font-size: 16px;
    }
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 2rem;
  `}
`

export default function Terms() {
  return (
    <Container>
      <Hero>
        <Image src={TERMS_LOGO} height={'90px'} alt="Logo" />
        <Title>Disclaimer</Title>
      </Hero>
      <MainWrap>
        <TextSpan>
          <p>Terms of service</p>
          <p>
            We provide the Service for your use subject to the following Terms. We reserve the right, in our sole
            discretion, to change or modify portions of these Terms at any time.
          </p>
          <p>
            Your continued use of the Service constitutes your acknowledgement of, acceptance of, and agreement to the
            revised Terms. You agree to periodically visit this page to review the current Terms so you are aware of any
            revision to which you are bound. We will indicate at the top of this page the date these terms were last
            revised. If you do not agree to abide by these or any future Terms, do not use or access (or continue to use
            or access) the Service. Additional terms and conditions may apply to certain services provided by DEUS
            Finance, and you agree that you shall be subject to any additional terms applicable to such services that
            may be posted on the Website or otherwise made available to you from time to time. All such terms are hereby
            incorporated by reference into these Terms. PLEASE READ THESE TERMS CAREFULLY TO ENSURE THAT YOU UNDERSTAND
            EACH PROVISION. THESE TERMS CONTAIN A MANDATORY INDIVIDUAL ARBITRATION AND CLASS ACTION/JURY TRIAL WAIVER
            PROVISION THAT REQUIRES THE USE OF ARBITRATION ON AN INDIVIDUAL BASIS TO RESOLVE DISPUTES, RATHER THAN JURY
            TRIALS OR CLASS ACTIONS. THE SERVICE MAY CONTAIN CONTENT THAT IS INACCURATE, OBJECTIONABLE, INAPPROPRIATE
            FOR CHILDREN, OR OTHERWISE UNSUITED TO YOUR PURPOSE, AND YOU AGREE THAT DEUS FINANCE SHALL NOT BE LIABLE FOR
            ANY DAMAGES YOU ALLEGE IN INCUR AS A RESULT OF ANY EXPOSURE TO SUCH CONTENT. YOU USE THE SERVICE AT YOUR OWN
            RISK. Eligibility This Service is intended solely for users who are 18 years of age or older. Any
            registration by, use of or access to the Service by anyone under 18 is unauthorized and in violation of
            these Terms. By using the Service, you represent and warrant that you are 18 years of age or older.
            Liabilities Disclaimer of Warranties TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, DEUS FINANCE
            SERVICES, DEUS FINANCE MATERIALS AND ANY PRODUCT, SERVICE OR OTHER ITEM PROVIDED BY OR ON BEHALF OF DEUS
            FINANCE ARE OFFERED ON AN “AS IS” AND “AS AVAILABLE” BASIS, AND DEUS FINANCE EXPRESSLY DISCLAIMS, AND YOU
            WAIVE, ANY AND ALL OTHER WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION,
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE OR NON-INFRINGEMENT OR WARRANTIES
            ARISING FROM COURSE OF PERFORMANCE, COURSE OF DEALING OR USAGE IN TRADE. WITHOUT LIMITING THE FOREGOING,
            DEUS FINANCE DOES NOT REPRESENT OR WARRANT THAT THE SITE, DEUS FINANCE SERVICES OR DEUS FINANCE MATERIALS
            ARE ACCURATE, COMPLETE, RELIABLE, CURRENT, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. DEUS
            FINANCE DOES NOT GUARANTEE THAT ANY ACTION WILL BE EXECUTED, ACCEPTED, RECORDED OR REMAIN OPEN. EXCEPT FOR
            THE EXPRESS STATEMENTS, AGREEMENTS AND RULES SET FORTH IN THESE TERMS, YOU HEREBY ACKNOWLEDGE AND AGREE THAT
            YOU HAVE NOT RELIED UPON ANY OTHER STATEMENT OR AGREEMENT, WHETHER WRITTEN OR ORAL, WITH RESPECT TO YOUR USE
            AND ACCESS OF DEUS FINANCE SERVICES. WITHOUT LIMITING THE FOREGOING, YOU HEREBY UNDERSTAND AND AGREE THAT
            DEUS FINANCE WILL NOT BE LIABLE FOR ANY LOSSES OR DAMAGES ARISING OUT OF OR RELATING TO: (A) ANY INACCURACY,
            DEFECT OR OMISSION OF DIGITAL ASSETS PRICE DATA, (B) ANY ERROR OR DELAY IN THE TRANSMISSION OF SUCH DATA,
            (C) INTERRUPTION IN ANY SUCH DATA, (D) REGULAR OR UNSCHEDULED MAINTENANCE CARRIED OUT BY DEUS FINANCE AND
            SERVICE INTERRUPTION AND CHANGE RESULTING FROM SUCH MAINTENANCE, (E) ANY DAMAGES INCURRED BY OTHER
            USERS&apos; ACTIONS, OMISSIONS OR VIOLATION OF THESE TERMS, (F) ANY DAMAGE CAUSED BY ILLEGAL ACTIONS OF
            OTHER THIRD PARTIES OR ACTIONS WITHOUT AUTHORIZED BY DEUS FINANCE; AND (G) OTHER EXEMPTIONS MENTIONED IN
            DISCLAIMERS AND PLATFORM RULES ISSUED BY DEUS FINANCE. THE DISCLAIMER OF IMPLIED WARRANTIES CONTAINED HEREIN
            MAY NOT APPLY IF AND TO THE EXTENT IT IS PROHIBITED BY APPLICABLE LAW OF THE JURISDICTION IN WHICH YOU
            RESIDE. Disclaimer of Damages and Limitation of Liability TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW,
            IN NO EVENT WILL DEUS FINANCE, ITS AFFILIATES AND THEIR RESPECTIVE SHAREHOLDERS, MEMBERS, DIRECTORS,
            OFFICERS, EMPLOYEES, ATTORNEYS, AGENTS, REPRESENTATIVES, SUPPLIERS OR CONTRACTORS BE LIABLE FOR ANY
            INCIDENTAL, INDIRECT, SPECIAL, PUNITIVE, CONSEQUENTIAL OR SIMILAR DAMAGES OR LIABILITIES WHATSOEVER
            (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF DATA, INFORMATION, REVENUE, PROFITS OR OTHER BUSINESSES
            OR FINANCIAL BENEFITS) ARISING OUT OF DEUS FINANCE SERVICES, ANY PERFORMANCE OR NON-PERFORMANCE OF DEUS
            FINANCE SERVICES, OR ANY OTHER PRODUCT, SERVICE OR OTHER ITEM PROVIDED BY OR ON BEHALF OF DEUS FINANCE AND
            ITS AFFILIATES, WHETHER UNDER CONTRACT, STATUTE, STRICT LIABILITY OR OTHER THEORY EVEN IF DEUS FINANCE HAS
            BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES EXCEPT TO THE EXTENT OF A FINAL JUDICIAL DETERMINATION THAT
            SUCH DAMAGES WERE A RESULT OF DEUS FINANCE&apos;S GROSS NEGLIGENCE, FRAUD, WILLFUL MISCONDUCT OR INTENTIONAL
            VIOLATION OF LAW. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL
            DAMAGES, SO THE ABOVE LIMITATION MAY NOT APPLY TO YOU. NOTWITHSTANDING THE FOREGOING, IN NO EVENT WILL THE
            LIABILITY OF DEUS FINANCE, ITS AFFILIATES AND THEIR RESPECTIVE SHAREHOLDERS, MEMBERS, DIRECTORS, OFFICERS,
            EMPLOYEES, ATTORNEYS, AGENTS, REPRESENTATIVES, SUPPLIERS OR CONTRACTORS ARISING OUT OF SERVICES OFFERED BY
            OR ON BEHALF OF DEUS FINANCE AND ITS AFFILIATES, ANY PERFORMANCE OR NON-PERFORMANCE OF DEUS FINANCE
            SERVICES, OR ANY OTHER PRODUCT, SERVICE OR OTHER ITEM, WHETHER UNDER CONTRACT, STATUTE, STRICT LIABILITY OR
            OTHER THEORY, EXCEED THE AMOUNT OF THE FEES PAID BY YOU TO DEUS FINANCE UNDER THESE TERMS IN THE
            TWELVE-MONTH PERIOD IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM FOR LIABILITY. No Financial
            Advice DEUS Finance is not your broker, intermediary, agent, or advisor and has no fiduciary relationship or
            obligation to you in connection with any trades or other decisions or activities effected by you using DEUS
            Finance Services. No communication or information provided to you by DEUS Finance is intended as, or shall
            be considered or construed as, investment advice, financial advice, trading advice, or any other sort of
            advice. You are solely responsible for determining whether any investment, investment strategy or related
            transaction is appropriate for you according to your personal investment objectives, financial circumstances
            and risk tolerance, and you shall be solely responsible for any loss or liability therefrom. You should
            consult legal or tax professionals regarding your specific situation. DEUS Finance does not recommend that
            any Digital Asset should be bought, earned, sold, or held by you. Before making the decision to buy, sell or
            hold any Digital Asset, you should conduct your own due diligence and consult your financial advisors prior
            to making any investment decision. DEUS Finance will not be held responsible for the decisions you make to
            buy, sell, or hold Digital Asset based on the information provided by DEUS Finance. Indemnification You
            agree to indemnify and hold harmless DEUS Finance Operators, their affiliates, contractors, licensors, and
            their respective directors, officers, employees and agents from and against any claims, actions,
            proceedings, investigations, demands, suits, costs, expenses and damages (including attorneys&apos; fees,
            fines or penalties imposed by any regulatory authority) arising out of or related to (i) your use of, or
            conduct in connection with, DEUS Finance Services, (ii) your breach or our enforcement of these Terms, or
            (iii) your violation of any applicable law, regulation, or rights of any third party during your use of DEUS
            Finance Services. If you are obligated to indemnify DEUS Finance Operators, their affiliates, contractors,
            licensors, and their respective directors, officers, employees or agents pursuant to these Terms, DEUS
            Finance will have the right, in its sole discretion, to control any action or proceeding and to determine
            whether DEUS Finance wishes to settle, and if so, on what terms. Access and Use of the Service DEI is the
            fractional-algorithmic stablecoin. The DEUS Protocol inspired by FRAX who introduced the world to the
            concept of a cryptocurrency being partially backed by collateral and partially stabilized algorithmically.
            Registration is not required to view content on the Service, but even unregistered Users are bound by these
            Terms. Subject to the terms and conditions of these Terms, you are hereby granted a non-exclusive, limited,
            non-transferable, freely revocable license to use the Service as permitted by the features of the Service.
            DEUS Finance reserves all rights not expressly granted herein in the Service and the DEUS Finance Content
            (as defined below). DEUS Finance may terminate this license at any time for any reason or no reason.
            Copyright / Repeat Infringement DEUS Finance responds to copyright complaints submitted under the Digital
            Millennium Copyright Act (“DMCA”). Section 512 of the DMCA outlines the statutory requirements needed for
            the formal reporting of copyright infringement, as well as providing instructions on how an affected party
            can appeal a removal by submitting a compliant counter-notice. DEUS Finance will respond to reports of
            copyright infringement, allegations concerning the unauthorized use of a copyrighted video, image, or other
            file uploaded through our media hosting services, or pages containing links to allegedly infringing
            materials. By using DEUS Finance, you have agreed to our Terms of Service, which prohibit people from taking
            any action on DEUS Finance that infringes or violates someone else&apos;s intellectual property rights or
            otherwise violates the law. If you repeatedly post content that infringes someone else&apos;s intellectual
            property rights, such as copyrights or trademarks, your IP address may be banned and your page removed under
            DEUS Finance&apos;s repeat infringer policy. If you believe your IP address was banned by mistake, please
            contact us. Designated Agent Modifications to Service DEUS Finance reserves the right to modify or
            discontinue, temporarily or permanently, the Service (or any part thereof) or any User account with or
            without notice. You agree that DEUS Finance shall not be liable to you or to any third party for any
            modification, suspension or discontinuance of the Service.
          </p>
          <p>Contact Please email admin@deus.finance</p>
        </TextSpan>
      </MainWrap>
    </Container>
  )
}
