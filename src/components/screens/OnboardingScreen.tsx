// src/components/screens/OnboardingScreen.tsx
// Brand hero on the left + glass login panel on the right (variant B).

import { useState } from 'react';
import {
  Button,
  ClayCard,
  GlassCard,
  Icon,
  Input,
  Eyebrow,
} from '@/components/ui';
import { Progress } from '@/components/ui/Progress';
import { Sparkline } from '@/components/charts';
import { fmtEUR } from '@/lib/format';

interface OnboardingScreenProps {
  onLogin?: () => void;
}

export function OnboardingScreen({ onLogin }: OnboardingScreenProps) {
  const [email, setEmail] = useState('marco@mail.it');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div
      className="relative h-full w-full overflow-hidden text-ink"
      style={{
        background:
          'linear-gradient(135deg, #e8d7ff 0%, #ffd3e8 50%, #f3ffe1 100%)',
      }}
    >
      <div className="absolute -left-[100px] -top-[100px] h-[380px] w-[380px] rounded-full bg-lavender opacity-80 blur-[50px]" />
      <div className="absolute -bottom-[150px] -right-[120px] h-[480px] w-[480px] rounded-full bg-mint opacity-60 blur-[60px]" />

      <div className="relative z-10 flex h-full">
        {/* Left brand hero */}
        <div className="flex flex-1 flex-col justify-between p-[60px_70px]">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white text-[22px] font-extrabold text-ink shadow-clay">
              €
            </div>
            <div>
              <div className="text-xl font-bold leading-none">Budget Tracker</div>
              <div className="mt-0.5 text-xs text-ink-body">spese, sempre chiare</div>
            </div>
          </div>

          <div className="max-w-[460px]">
            <h1 className="text-[56px] font-bold leading-[1.02] tracking-[-1px] text-ink">
              Le tue spese,
              <br />
              finalmente
              <br />
              chiare.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-body">
              Tutto in un'app: transazioni, categorie, obiettivi di risparmio.
              Niente fronzoli, solo i numeri che contano.
            </p>
          </div>

          {/* Floating preview cards */}
          <div className="flex items-end gap-4">
            <ClayCard
              className="!p-4"
              style={{ background: '#fff', width: 180, transform: 'rotate(-3deg)' }}
            >
              <Eyebrow>questo mese</Eyebrow>
              <div className="mt-1 text-[26px] font-bold">{fmtEUR(2480.5)}</div>
              <Sparkline data={[3, 5, 4, 6, 5, 7, 8]} width={140} height={22} color="#9dd190" />
            </ClayCard>
            <ClayCard
              swatch="mint"
              className="!p-3.5"
              style={{ width: 140, transform: 'rotate(2deg)' }}
            >
              <Eyebrow>obiettivo</Eyebrow>
              <div className="mt-1 flex items-baseline gap-1">
                <div className="text-[22px] font-bold">74%</div>
                <div className="text-[11px] text-ink-body">Grecia</div>
              </div>
              <Progress value={0.74} color="#fff" bg="rgba(255,255,255,0.4)" h={6} className="mt-1.5" />
            </ClayCard>
            <ClayCard
              swatch="lavender"
              className="!p-3.5"
              style={{ width: 120, transform: 'rotate(-2deg)' }}
            >
              <Eyebrow>oggi</Eyebrow>
              <div className="mt-1 text-[22px] font-bold">€ 61</div>
              <div className="mt-0.5 text-[11px] text-ink-body">3 spese</div>
            </ClayCard>
          </div>
        </div>

        {/* Right glass login panel */}
        <div className="flex w-[480px] items-center p-[50px_50px_50px_0]">
          <GlassCard hi className="w-full !p-9 shadow-lg">
            <div className="text-[26px] font-bold">Bentornato</div>
            <div className="mt-1 text-[13px] text-ink-soft">
              Inserisci le credenziali per continuare.
            </div>

            <div className="mt-6 flex flex-col gap-3.5">
              <Field label="Email">
                <Input value={email} onChange={setEmail} placeholder="email@example.com" />
              </Field>
              <Field label="Password">
                <Input
                  value={password}
                  onChange={setPassword}
                  type={showPwd ? 'text' : 'password'}
                  placeholder="••••••••"
                  suffix={
                    <button
                      onClick={() => setShowPwd(!showPwd)}
                      className="cursor-pointer text-ink-soft"
                    >
                      <Icon name={showPwd ? 'eye-off' : 'eye'} size={16} />
                    </button>
                  }
                />
              </Field>

              <div className="mt-0.5 flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 text-xs text-ink-body">
                  <input type="checkbox" defaultChecked className="accent-lavender-deep" />
                  Ricordami
                </label>
                <a href="#" className="text-xs font-semibold text-ink-body hover:text-ink">
                  password dimenticata?
                </a>
              </div>

              <Button
                variant="primary"
                size="lg"
                full
                iconRight="arrow-right"
                onClick={onLogin}
                className="mt-2"
              >
                Entra
              </Button>

              <div className="my-1 flex items-center gap-2.5">
                <div className="h-px flex-1 bg-line" />
                <span className="text-[11px] font-semibold text-ink-soft">oppure</span>
                <div className="h-px flex-1 bg-line" />
              </div>

              <Button variant="secondary" full onClick={onLogin}>
                <span className="mr-1 font-extrabold">G</span> Continua con Google
              </Button>
              <Button variant="secondary" full onClick={onLogin}>
                Continua con Apple
              </Button>
            </div>

            <div className="mt-5 text-center text-xs text-ink-body">
              Non hai un account?{' '}
              <a href="#" className="font-bold text-ink">
                Crea profilo
              </a>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 text-[11px] font-semibold text-ink-body">{label}</div>
      {children}
    </div>
  );
}
