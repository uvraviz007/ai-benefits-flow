import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  CircularProgress,
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import type { Benefit } from '../types';

interface Props {
  benefit: Benefit;
  steps: string[] | null;
  onRegenerate: () => void;
}

export default function BenefitDetails({ benefit, steps, onRegenerate }: Props) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f3f4f6',
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 700, width: '100%', borderRadius: 3, boxShadow: 6 }}>
        <CardContent>
          {/* Start Over Button */}
          <Box sx={{ mb: 2 }}>
            <Button
              variant="text"
              color="secondary"
              onClick={() => window.location.reload()}
              size="small"
            >
              Start Over
            </Button>
          </Box>

          {/* Benefit Header */}
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {benefit.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Category: {benefit.category}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {benefit.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Coverage: {benefit.coverage}
          </Typography>

          {/* Step-by-Step Plan */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              Step-by-step plan
            </Typography>

            {!steps && (
              <Stack direction="row" alignItems="center" spacing={1} mt={2}>
                <CircularProgress size={20} />
                <Typography variant="body2" color="text.secondary">
                  Generating plan...
                </Typography>
              </Stack>
            )}

            {steps && (
              <List dense sx={{ mt: 1 }}>
                {steps.map((step, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemText primary={`${index + 1}. ${step}`} />
                  </ListItem>
                ))}
              </List>
            )}

            {/* Regenerate Button */}
            <Stack direction="row" spacing={2} mt={2}>
              <Button
                variant="outlined"
                startIcon={<ReplayIcon />}
                onClick={onRegenerate}
              >
                Regenerate plan
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
